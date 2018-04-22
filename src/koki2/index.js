import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import crud from '../crud'

import * as uiKits from '../component/ui-kits'
import socket from '../component/socket'
import SFX from '../component/_sfx'

import Sidebar from './sidebar'
import Pesanan from './pesanan'

export default class Koki extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotaPesanan: [],
            pesanan: [],
            pesananRestrict: [],
            notaPesanan: undefined
        }
    }
    componentWillMount() {
        this.ambilPesanan().then(res => {
            if (this.props.match.params.nota != ':nota') {
                this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
            } else {
                if (this.state.listNotaPesanan.length !== 0) {
                    this.props.history.push(this.props.match.path.replace(':nota', this.state.listNotaPesanan[0].no_nota.replace('/', '%2f')))
                }
            }
        });
        socket.on('update', this._socketOnUpdate.bind(this));
    }
    componentWillUnmount() {
        socket.off('update', this._socketOnUpdate.bind(this));
    }
    componentWillReceiveProps(n) {
        this.ambilPesanan().then(res => {
            if (n.match.params.nota !== ':nota') {
                if (n.match.params.nota === this.props.match.params.nota) {
                    this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
                }
            } else {
                if (this.state.listNotaPesanan.length !== 0) {
                    this.props.history.push(this.props.match.path.replace(':nota', this.state.listNotaPesanan[0].no_nota.replace('/', '%2f')))
                }
            }
        });
    }
    render() {
        if (this.state.listNotaPesanan.length === 0) {
            return (
                <div className='fixed top right left bottom flex-parent'>
                    Belum ada pesanan
                </div>
            )
        } else {
            return (
                <div className='fixed top right left bottom flex-parent'>
                    <Sidebar ambilPesanan={this.ambilPesanan.bind(this)}
                        parentState={this.state}
                        parentProps={this.props} />
                    <Pesanan parentProps={this.props} parentState={this.state}
                        donePesanan={this.donePesanan.bind(this)}
                        prosesPesanan={this.prosesPesanan.bind(this)} />
                </div>
            )
        }
    }
    _onClick() {
        console.log('taklik');
    }
    _socketOnUpdate() {
        SFX().play();
        this.ambilPesanan().then(res => {
            if (this.props.match.params.nota != ':nota') {
                this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
            }
        });
    }
    ambilPesanan() {
        return crud.ambil.pesanan()
            .then((res) => {
                console.log(res);
                this.setState({
                    listNotaPesanan: res.data
                })
            });

    }
    timpahPesanan(no_nota) {
        const notaPesanan = this.state.listNotaPesanan.find(val => val.no_nota === no_nota);
        if (notaPesanan) {
            this.setState({
                pesanan: [],
                pesananRestrict: [],
                notaPesanan
            }, () => {
                notaPesanan.list_pesanan.map(val => {
                    this.tambahPesanan(val);
                })
            })
        } else {
            if (this.state.listNotaPesanan.length !== 0) {
                this.props.history.push(this.props.match.path.replace(':nota', this.state.listNotaPesanan[0].no_nota.replace('/', '%2f')));
            }
        }
    }
    tambahPesanan(val, ev) {
        console.log(val.status, '');
        let pesanan;
        let pesananRestrict;
        if (val.status === 'Diorder' || typeof val.status === 'undefined') {
            if (this.state.pesanan.find(v => v.id_item === val.id_item)) {
                pesanan = this.state.pesanan.map((v, i) => {
                    if (v.id_item === val.id_item) {
                        v.jumlah_pesanan += 1;
                    }
                    return v;
                })
            } else {
                const arr = this.state.pesanan;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesanan = arr;
            }
            if (typeof ev === 'object' && typeof this.state.notaPesanan !== 'undefined') {
                const nota = this.state.notaPesanan;
                crud.update.pesanan.add(nota.no_nota, nota.no_meja, val.id_item, 1);
            }
            this.setState({
                pesanan
            })
        } else {
            if (this.state.pesananRestrict.find(v => v.id_item === val.id_item)) {
                pesananRestrict = this.state.pesananRestrict.map((v, i) => {
                    if (v.id_item === val.id_item) {
                        v.jumlah_pesanan += 1;
                    }
                    return v;
                })
            } else {
                const arr = this.state.pesananRestrict;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesananRestrict = arr;
            }
            this.setState({
                pesananRestrict
            })
        }
    }
    prosesPesanan(val) {
        val.status = 'Diproses';
        if (this.props.match.params.nota !== ':nota') {
            const notaPesanan = this.state.notaPesanan;
            const item = notaPesanan.list_pesanan.find(v => v.id_item === val.id_item && v.status === 'Diorder');
            notaPesanan.list_pesanan.splice(notaPesanan.list_pesanan.indexOf(item), 1);
            this.setState({
                notaPesanan
            })
            crud.prosesPesanan(val.id_pesanan, notaPesanan.no_nota)
        }
        const pesanan = [];
        this.state.pesanan.forEach((v, i) => {
            if (val.id_item === v.id_item) {
                v.jumlah_pesanan -= 1;
            }
            if (!(v.jumlah_pesanan <= 0)) {
                pesanan.push(v);
            }
        })
        console.log(pesanan);
        this.setState({
            pesanan
        }, this.tambahPesanan(val));
    }
    donePesanan(val) {
        const notaPesanan = this.state.notaPesanan;
        const item = notaPesanan.list_pesanan.find(v => v.id_item === val.id_item && v.status === 'Diorder');
        notaPesanan.list_pesanan.splice(notaPesanan.list_pesanan.indexOf(item), 1);
        this.setState({
            notaPesanan
        })
        crud.donePesanan(val.id_pesanan, notaPesanan.no_nota)
        const pesananRestrict = [];
        this.state.pesananRestrict.forEach((v, i) => {
            if (val.id_item === v.id_item) {
                v.jumlah_pesanan -= 1;
            }
            if (!(v.jumlah_pesanan <= 0)) {
                pesananRestrict.push(v);
            }
        })
        this.setState({
            pesananRestrict
        })
    }
    _logout() {
        crud.auth.logout().then(res => this.props.history.push('/login'));
    }
}