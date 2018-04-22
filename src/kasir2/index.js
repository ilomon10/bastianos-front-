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
            pesananDiproses: [],
            pesananSelesai: [],
            pesananDibayar: [],
            notaPesanan: undefined
        }
    }
    componentWillMount() {
        this.ambilPesanan().then(res => {
            if (this.props.match.params.nota != ':nota') {
                this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
            }
        });
        socket.on('update', res => {
            SFX().play();
            this.ambilPesanan().then(res => {
                if (this.props.match.params.nota != ':nota') {
                    this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
                }
            });
        })
    }
    componentWillReceiveProps(n) {
        this.ambilPesanan().then(res => {
            if (n.match.params.nota !== ':nota') {
                if (n.match.params.nota === this.props.match.params.nota) {
                    console.log(n.match.params, this.props.match.params);
                    this.timpahPesanan(this.props.match.params.nota.replace('%2f', '/'));
                }
            }
        });
    }


    render() {
        return (
            <div className='fixed top right left bottom flex-parent'>
                <Sidebar ambilPesanan={this.ambilPesanan.bind(this)}
                    parentState={this.state} />
                <Pesanan parentProps={this.props} parentState={this.state} hitungHargaPesanan={this.hitungHargaPesanan.bind(this)}/>
            </div>
        )
    }


    _onClick() {
        console.log('taklik');
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
                pesananDiproses: [],
                pesananSelesai: [],
                pesananDibayar: [],
                notaPesanan
            }, () => {
                notaPesanan.list_pesanan.map(val => {
                    this.tambahPesanan(val);
                })
            })
        } else {
            this.props.history.push(this.props.match.path.replace(':nota', this.state.listNotaPesanan[0].no_nota.replace('/', '%2f')));
        }
    }
    tambahPesanan(val, ev) {
        console.log(val, '');
        let pesanan;
        let pesananDiproses;
        let pesananSelesai;
        let pesananDibayar;
        const loop = (v, i) => {
            if (v.id_item === val.id_item) {
                v.jumlah_pesanan += 1;
            }
            return v;
        }
        if (val.status === 'Diorder' || typeof val.status === 'undefined') {
            if (this.state.pesanan.find(v => v.id_item === val.id_item)) {
                pesanan = this.state.pesanan.map(loop)
            } else {
                const arr = this.state.pesanan;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesanan = arr;
            }
            this.setState({
                pesanan
            })
        } else if (val.status === 'Diproses') {
            if (this.state.pesananDiproses.find(v => v.id_item === val.id_item)) {
                pesananDiproses = this.state.pesananDiproses.map(loop)
            } else {
                const arr = this.state.pesananDiproses;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesananDiproses = arr;
            }
            this.setState({
                pesananDiproses
            })
        } else if (val.status === 'Selesai') {
            if (this.state.pesananSelesai.find(v => v.id_item === val.id_item)) {
                pesananSelesai = this.state.pesananSelesai.map(loop)
            } else {
                const arr = this.state.pesananSelesai;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesananSelesai = arr;
            }
            this.setState({
                pesananSelesai
            })
        } else if (val.status === 'Dibayar') {
            if (this.state.pesananDibayar.find(v => v.id_item === val.id_item)) {
                pesananDibayar = this.state.pesananDibayar.map(loop)
            } else {
                const arr = this.state.pesananDibayar;
                val.jumlah_pesanan = 1;
                arr.push(val)
                pesananDibayar = arr;
            }
            this.setState({
                pesananDibayar
            })
        }
    }
    
    hitungHargaPesanan() {
        const { pesananDibayar, pesananDiproses, pesananSelesai } = this.state;
        const pesanan = [].concat(pesananDibayar, pesananDiproses, pesananSelesai);
        const format = (v) => 'Rp.' + v.toLocaleString('de-DE');
        if (pesanan.length === 0) return {
            minuman: format(0),
            makanan: format(0),
            subtotal: format(0),
            pajak: format(0),
            total: format(0),
        };
        const subtotal = pesanan.reduce((prev, cur, idx, arr) => {
            return (cur.harga * cur.jumlah_pesanan) + prev;
        }, 0)
        const pajak = subtotal * (10 / 100);
        const total = subtotal + pajak;
        return {
            subtotal: format(subtotal),
            pajak: format(pajak),
            total: format(total),
        }
    }
    _logout() {
        crud.auth.logout().then(res => this.props.history.push('/login'));
    }
}