import React, { Component } from 'react'

import crud from '../crud'

import AspectRatio from '../component/aspectRatio';
import Currency from '../component/currency';
import Icon from '../component/icon';

export default class Nota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesananDipilih: {},
            listPesanan: []
        }
    }
    componentWillReceiveProps(n) {
        console.log(n);
        if (n.pesananDipilih.list_pesanan) {
            if (n.pesananDipilih !== this.state.pesananDipilih) {
                this.setState({
                    pesananDipilih: n.pesananDipilih,
                    listPesanan: n.pesananDipilih.list_pesanan
                })
            }
        }
    }
    render() {
        console.log(this.state)
        const listPesanan = this.state.listPesanan.map((el, idx) => {
            return (
                <div key={idx} className='flex-parent flex-parent--column'>
                    <div className='flex-parent flex-parent--center-cross px12'>
                        <div className='flex-child w60 py12'>
                            <AspectRatio className='bg-darken10'></AspectRatio>
                        </div>
                        <div className='flex-child flex-child--grow px12'>
                            <div className='txt-h4'>{el.nama_item}</div>
                        </div>
                        <Currency nilai={el.harga} />
                        <div className='flex-child px12'>
                            <div className='txt-h4'>x{el.jumlah_pesanan}</div>
                        </div>
                    </div>
                </div>
            )
        })
        if (Object.keys(this.state.pesananDipilih).length !== 0 && this.state.pesananDipilih.constructor === Object) {
            return (
                <div className='flex-child flex-parent flex-parent--column w600-mxl w360-ml shadow-darken10 z1'>
                    <div className='flex-child px12 align-center flex-parent flex-parent--center-cross border-b border--darken10'>
                        <div className='txt-h4 flex-child py6'>
                            <button onClick={this.props.logout} className='btn btn--transparent color-darken25 py3 px3 round'>
                                <Icon iconName='logout' height='20' width='20' />
                            </button>
                        </div>
                        <div className='txt-h4 flex-child py6'>Nota {this.state.pesananDipilih.no_nota}</div>
                        <div className='txt-h4 flex-child flex-child--grow py6'>Meja #{this.state.pesananDipilih.no_meja}</div>
                        <div className='txt-h5 flex-child py6 ml12'>Waktu Pesanan {new Date(this.state.pesananDipilih.waktu).getHours()}:{new Date(this.state.pesananDipilih.waktu).getMinutes()}</div>
                    </div>
                    <div className='flex-child flex-child--grow'>
                        {listPesanan}
                    </div>
                    <div className='flex-child flex-child--no-shrink py6'>
                        <div className='flex-parent px12'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-l'>Subtotal</div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-l' nilai={125000} />
                            </div>
                        </div>
                        <div className='flex-parent px12'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-l'><span>Pajak</span> <span className='color-red'>(10%)</span></div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-l' nilai={125000 * (10 / 100)} />
                            </div>
                        </div>
                        <div className='flex-parent flex-parent--center-main px12 border-t border--darken10'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-xl'>Total</div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-xl' nilai={125000} />
                            </div>
                            <button onClick={this._bayar.bind(this)} className='btn round flex-child my6 py3 ml6'>Bayar</button>
                        </div>
                    </div>
                    {/* <div className='flex-child px12 pb6 align-left'>
                        <button onClick={this._bayar.bind(this)} className='btn'>Bayar</button>
                    </div> */}
                </div>
            )
        } else {
            return (
                <div className='flex-child flex-parent flex-parent--column w0 shadow-darken10 z1'>
                </div>
            )
        }
    }
    _bayar() {
        crud.bayarPesanan(this.state.pesananDipilih.no_nota);
    }
}