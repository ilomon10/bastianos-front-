import React, { Component } from 'react'

import AspectRatio from '../component/aspectRatio'
import Currency from '../component/currency'

export default class Nota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notaDipilih: {},
            pesanan: []
        }
    }
    componentWillReceiveProps(n) {
        if (n.notaDipilih !== this.state.notasDipilih) this.setState({ notaDipilih: n.notaDipilih })
    }
    render() {
        const { className } = this.props;
        const listPesanan = this.state.pesanan.map((el, idx) => {
            return (
                <div key={idx} className='flex-parent flex-parent--column'>
                    <div className='flex-parent flex-parent--center-cross px12'>
                        <div className='flex-child w60 py12'>
                            <AspectRatio className='bg-darken10'></AspectRatio>
                        </div>
                        <div className='flex-child flex-child--grow px12'>
                            <div className='txt-h4'>{el.nama}</div>
                        </div>
                        <Currency nilai={el.harga} />
                        <div className='flex-child px12'>
                            <div className='txt-h4'>x{el.jumlahPesanan}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={`${className} flex-parent flex-parent--column w600`}>
                <div className='flex-child px12 align-center flex-parent flex-parent--center-cross border-b border--darken10 grid'>
                    <div className='txt-h4 flex-child py6 col--4'>Nota #{this.state.notaDipilih.nota}</div>
                    <div className='txt-h4 flex-child py6 col--4'>Meja #{this.state.notaDipilih.meja}</div>
                    <div className='txt-h5 flex-child py6 col--4'>Waktu Pesanan 10:10pm</div>
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
                    <div className='flex-parent px12 border-t border--darken10'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-xl'>Total</div>
                        </div>
                        <div className='flex-child'>
                            <Currency className='txt-xl' nilai={125000} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}