import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import crud from '../crud'
import Scan from './scan'

import * as uiKits from '../component/ui-kits/'
import HorizontalScroll from '../component/horizontalScroll'

const IcoNumber = styled.div`
    font-size: 29pt!important;
    line-height: 1;
`

export default class Pesanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert1: false,
            alert2: false,
            scanMode: true,
            no_meja: ''
        }
    }
    componentWillReceiveProps(n) {
        console.log(n.match.params.nota, this.props.match.params.nota);
        if (n.match.params.nota !== 'baru') {
            if (n.match.params.nota === this.props.match.params.nota) {
                this.setState({
                    no_meja: parseInt(n.match.params.nota, 10)
                })
            }
        }
    }
    render() {
        const list = this.props.parentState.pesanan.map((v, i) => (
            <uiKits.TableViewRow key={i} type='large'
                iconUrl='#'
                title={v.nama_item}
                subtitle={`Rp.${(v.harga).toLocaleString('de-DE')}`}
                with={{
                    type: 'stepper',
                    placeholder: 'Beli',
                    increase: this.props.tambahPesanan.bind(this, v),
                    decrease: this.props.kurangPesanan.bind(this, v),
                    value: v.jumlah_pesanan
                }}
            />
        ))
        const listReady = this.props.parentState.pesananRestrict.map((v, i) => (
            <uiKits.TableViewRow key={i} type='default'
                iconUrl='#'
                title={v.nama_item}
                subtitle={`Rp.${(v.harga).toLocaleString('de-DE')}`}
                with={{
                    type: 'value',
                    value: v.jumlah_pesanan
                }}
            />
        ))
        const listNotaPesanan = this.props.parentState.listNotaPesanan.map((val, idx) => {
            return (
                <div key={idx}>
                    <NavLink
                        to={this.props.match.path.replace(':nota', val.no_meja)}
                        activeClassName='active'>
                        <IcoNumber>#{val.no_meja}</IcoNumber>
                        <div>{val.no_nota}</div>
                    </NavLink>
                </div>
            )
        })
        const hargaPesanan = this.props.hitungHargaPesanan();
        return (
            <div className='fixed top right bottom left flex-parent flex-parent--column bg-white z1'>
                <uiKits.bar top>
                    <div className='barLeft'>
                        <uiKits.actionButton onClick={this.kembali.bind(this)}>Kembali</uiKits.actionButton>
                    </div>
                    <div className='barCenter'>
                        <div className='title'>
                            Tagihan
                        </div>
                        {typeof this.props.parentState.notaPesanan !== 'undefined' &&
                            <div className='subtitle'>
                                {this.props.parentState.notaPesanan.no_nota}
                            </div>
                        }
                    </div>
                    <div className='barRight'>
                        {this.props.match.params.nota === 'baru' &&
                            <uiKits.actionButton onClick={this.konfirmasi.bind(this)}>Pesan</uiKits.actionButton>}
                    </div>
                </uiKits.bar>
                <div className='flex-child flex-child--grow scroll-auto'>
                    <uiKits.TableView>
                        {list.length !== 0 &&
                            <uiKits.TableViewGrouped header={'Order'}>
                                {list}
                            </uiKits.TableViewGrouped>}
                        {listReady.length !== 0 &&
                            <uiKits.TableViewGrouped header={'Sudah siap'}>
                                {listReady}
                            </uiKits.TableViewGrouped>}
                    </uiKits.TableView>
                </div>
                <div className='flex-child flex-child--no-shrink flex-parent flex-parent--column'>
                    <div className='flex-parent px12'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-l'>Subtotal</div>
                        </div>
                        <div className='flex-child txt-l'>
                            {hargaPesanan.subtotal}
                        </div>
                    </div>
                    <div className='flex-parent px12'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-l'><span>Pajak</span> <span className='color-red'>(10%)</span></div>
                        </div>
                        <div className='flex-child txt-l'>
                            {hargaPesanan.pajak}
                        </div>
                    </div>
                    <div className='flex-parent px12 border-t border--darken10'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-xl'>Total</div>
                        </div>
                        <div className='flex-child txt-xl'>
                            {hargaPesanan.total}
                        </div>
                    </div>
                </div>
                <uiKits.bar bottom className='scroll-auto'>
                    <uiKits.tabBar className='flex-parent flex-parent--center-main'>
                        {listNotaPesanan.length === 0 && <div className='title'>Belum ada pesanan</div>}
                        <div>
                            <NavLink
                                to={this.props.match.path.replace(':nota', 'baru')}
                                activeClassName='active'>
                                <IcoNumber>+</IcoNumber>
                                <div>Nota Baru</div>
                            </NavLink>
                        </div>
                        {listNotaPesanan}
                    </uiKits.tabBar>
                </uiKits.bar>
                <uiKits.Alerts isOpen={this.state.alert1}>
                    <div className='title'>Silahkan pilih menu dahulu</div>
                    <uiKits.actionButton onClick={this.kembali.bind(this)}>Pilih sesuatu</uiKits.actionButton>
                </uiKits.Alerts>
                <uiKits.Alerts isOpen={this.state.alert2}>
                    <div className='title'>Nomor Meja</div>
                    <div className='subtitle'>Masukan nomor meja</div>
                    {!this.state.scanMode &&
                        <uiKits.input type='number'
                            placeholder='Nomor'
                            value={this.state.no_meja}
                            onChange={this._onChangeNoMeja.bind(this)} />
                        ||
                        <Scan onScan={this._onScan.bind(this)} />
                    }
                    <uiKits.actionButton onClick={this.tutupAlert2.bind(this)}>Batal</uiKits.actionButton>
                    {!this.state.scanMode &&
                        <uiKits.actionButton onClick={this.pesan.bind(this)}
                            disabled={this.state.no_meja === ''}>Pesan</uiKits.actionButton>
                        ||
                        <uiKits.actionButton onClick={() => this.setState({ scanMode: false })}>Isi Manual</uiKits.actionButton>
                    }
                </uiKits.Alerts>
            </div>
        )
    }
    _onScan(val) {
        console.log(JSON.parse(val));
        this.setState({
            no_meja: JSON.parse(val).no_meja
        }, this.pesan.bind(this));
    }
    _onChangeNoMeja(el) {
        this.setState({
            no_meja: el.target.value
        })
    }
    kembali() {
        this.props.history.push(
            this.props.parentRoute.match.path.replace(':nota', this.props.match.params.nota)
        );
    }
    bukaAlert2() {
        this.setState({
            alert2: true
        })
    }
    tutupAlert2() {
        this.setState({
            alert2: false,
            scanMode: true
        })
    }
    konfirmasi() {
        if (this.props.parentState.pesanan.length === 0) {
            this.setState({
                alert1: true
            })
        } else {
            this.bukaAlert2();
        };
    }
    pesan() {
        console.log(this.state.no_meja);
        const list_pesanan = this.props.parentState.pesanan.map(v => {
            return {
                id_item: v.id_item,
                jumlah_pesanan: v.jumlah_pesanan
            }
        })
        crud.pesanItems({
            no_meja: this.state.no_meja,
            list_pesanan
        }).then(res => {
            this.props.history.push(this.props.parentRoute.match.path.replace(':nota', this.state.no_meja));
        })
    }
}