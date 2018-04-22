import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import crud from '../crud'

import Icon from '../component/icon'
import HorizontalScroll from '../component/horizontalScroll'
import _404 from '../component/_404'
import * as uiKits from '../component/ui-kits/'
import socket from '../component/socket';
import SFX from '../component/_sfx'

import Semua from './semua'
import Cari from './cari'
import Makanan from './makanan'
import Minuman from './minuman'
import Pesanan from './pesanan'
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

export default class Pelayan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotaPesanan: [],
            pesanan: [],
            pesananRestrict: [],
            tandaiItems: [],
            notaPesanan: undefined,
        }
    }
    componentWillMount() {
        this.ambilPesanan().then(() => {
            if (this.props.match.params.nota === ':nota') {
                this.props.history.push(this.props.match.path.replace(':nota', 'baru'));
            } else {
                this.timpahPesanan(parseInt(this.props.match.params.nota));
            }
        });
        socket.on('update', res => {
            this.ambilPesanan().then(res => {
                if (this.props.match.params.nota != ':nota') {
                    this.timpahPesanan(parseInt(this.props.match.params.nota));
                }
            });
        })
    }
    componentWillReceiveProps(n) {
        if (n.match.params.nota !== ':nota') {
            if (n.match.params.nota !== this.props.match.params.nota) {
                this.ambilPesanan().then(() => {
                    if (n.match.params.nota === 'baru') {
                        this.setState({
                            pesanan: [],
                            pesananRestrict: [],
                            notaPesanan: undefined
                        })
                    } else {
                        this.timpahPesanan(parseInt(n.match.params.nota));
                    }
                });
            }
        }
    }
    render() {
        const { match } = this.props;
        const hargaPesanan = this.hitungHargaPesanan();
        return (
            <div className='fixed top right bottom left flex-parent flex-parent--column'>
                <uiKits.bar top>
                    <div className='barLeft'>
                        <div className='title'>Bastianos</div>
                    </div>
                    <div className='barCenter'>
                        <uiKits.segmentControl>
                            <NavLink exact
                                to={match.path.replace(':nota', match.params.nota)}
                                activeClassName='active'>Semua</NavLink>
                            <NavLink exact
                                to={`${match.path.replace(':nota', match.params.nota)}/makanan`}
                                activeClassName='active'>Makanan</NavLink>
                            <NavLink exact
                                to={`${match.path.replace(':nota', match.params.nota)}/minuman`}
                                activeClassName='active'>Minuman</NavLink>
                        </uiKits.segmentControl>
                    </div>
                    <div className='barRight flex-parent--end-main'>
                        <uiKits.input onClick={this._openSearch.bind(this)} type='text' placeholder='Cari' />
                    </div>
                </uiKits.bar>
                <Switch>
                    <Route path={`${match.path}/makanan`} render={
                        props => <Makanan {...props}
                            pesanan={this.state.pesanan}
                            tambahPesanan={this.tambahPesanan.bind(this)}
                            kurangPesanan={this.kurangPesanan.bind(this)} />
                    } />
                    <Route path={`${match.path}/minuman`} render={
                        props => <Minuman {...props}
                            pesanan={this.state.pesanan}
                            tambahPesanan={this.tambahPesanan.bind(this)}
                            kurangPesanan={this.kurangPesanan.bind(this)} />
                    } />
                    <Route path={match.path} render={
                        props => <Semua {...props}
                            pesanan={this.state.pesanan}
                            tandaiItem={this.tandaiItem.bind(this)}
                            tandaiItems={this.state.tandaiItems}
                            tambahPesanan={this.tambahPesanan.bind(this)}
                            kurangPesanan={this.kurangPesanan.bind(this)} />
                    } />
                </Switch>
                <uiKits.bar bottom>
                    <div className='barLeft flex-parent flex-parent--column'>
                        <div className='flex-child txt-m'>Makanan</div>
                        <div className='flex-child txt-l'>{hargaPesanan.makanan}</div>
                    </div>
                    <div className='barCenter'>
                        <uiKits.tabBar className='flex-parent flex-parent--center-main'>
                            <div>
                                <NavLink
                                    to={this.props.match.url}
                                    activeClassName='active'>
                                    <Icon iconName='floppy' height='44' width='44' />
                                    <div>Menu</div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink exact
                                    to={this.props.match.url + '/pesanan'}
                                    activeClassName='active'>
                                    <Icon iconName='clipboard' height='44' width='44' />
                                    <div>Pesanan</div>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={this._logout.bind(this)}>
                                    <Icon iconName='logout' height='44' width='44' />
                                    <div>Logout</div>
                                </button>
                            </div>
                        </uiKits.tabBar>
                    </div>
                    <div className='barRight flex-parent flex-parent--column'>
                        <div className='flex-child txt-m'>Minuman</div>
                        <div className='flex-child txt-l'>{hargaPesanan.minuman}</div>
                    </div>
                </uiKits.bar>
                <Route name='pesanan' path={`${match.path}/pesanan`} render={
                    props => <Pesanan {...props}
                        parentRoute={this.props} parentState={this.state}
                        hitungHargaPesanan={this.hitungHargaPesanan.bind(this)}
                        tambahPesanan={this.tambahPesanan.bind(this)}
                        kurangPesanan={this.kurangPesanan.bind(this)} />
                } />
                <Route path={`${match.path}/cari`} render={
                    props => <Cari {...props}
                        parentRoute={this.props} parentState={this.state}
                        tambahPesanan={this.tambahPesanan.bind(this)}
                        kurangPesanan={this.kurangPesanan.bind(this)} />
                } />
            </div>
        )
    }
    ambilPesanan() {
        return crud.ambil.pesanan()
            .then(res => {
                console.log(res);
                this.setState({
                    listNotaPesanan: res.data
                })
            })
    }
    timpahPesanan(noMeja) {
        const notaPesanan = this.state.listNotaPesanan.find(val => noMeja === val.no_meja);
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
        }
    }
    tambahPesanan(val, ev) {
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
    kurangPesanan(val) {
        if (this.props.match.params.nota !== 'baru') {
            const notaPesanan = this.state.notaPesanan;
            const item = notaPesanan.list_pesanan.find(v => v.id_item === val.id_item && v.status === 'Diorder');
            notaPesanan.list_pesanan.splice(notaPesanan.list_pesanan.indexOf(item), 1);
            this.setState({
                notaPesanan
            })
            crud.update.pesanan.delete(item.id_pesanan, notaPesanan.no_nota);
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
        this.setState({
            pesanan
        })
    }
    hitungHargaPesanan() {
        const { pesanan } = this.state;
        const format = (v) => 'Rp.' + v.toLocaleString('de-DE')
        if (pesanan.length === 0) return {
            minuman: format(0),
            makanan: format(0),
            subtotal: format(0),
            pajak: format(0),
            total: format(0),
        };
        const makanan = pesanan.reduce((prev, cur, idx, arr) => {
            if (cur.group !== 'Makanan') return prev;
            return (cur.harga * cur.jumlah_pesanan) + prev;
        }, 0)
        const minuman = pesanan.reduce((prev, cur, idx, arr) => {
            if (cur.group !== 'Minuman') return prev;
            return (cur.harga * cur.jumlah_pesanan) + prev;
        }, 0)
        const subtotal = makanan + minuman;
        const pajak = subtotal * (10 / 100);
        const total = subtotal + pajak;
        return {
            minuman: format(minuman),
            makanan: format(makanan),
            subtotal: format(subtotal),
            pajak: format(pajak),
            total: format(total),
        }
    }
    tandaiItem(val, reset) {
        let items = this.state.tandaiItems;
        let item;
        if (reset !== 'reset') {
            if (items.find(v => val.id_item === v.id_item)) {
                items = items.map(v => {
                    if (v.id_item === val.id_item) v.tandai += 1;
                    return v;
                })
            } else {
                val.tandai = 1;
                items.push(val);
            }
        } else {
            item = items.find(v => v.id_item === val.id_item);
            items.splice(items.indexOf(item), 1);
        }
        this.setState({
            tandaiItems: items
        })
    }

    _logout() {
        crud.auth.logout()
            .then(res => {
                this.props.history.push('/login');
            })
    }
    _openSearch() {
        this.props.history.push(`${this.props.match.url}/cari`);
    }
}