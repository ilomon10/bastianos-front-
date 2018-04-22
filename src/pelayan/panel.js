import React, { Component } from 'react'

import Truncate from '../component/truncate'
import TambahKurang from './tambahKurang'
import AspectRatio from '../component/aspectRatio'
import Currency from '../component/currency';

export default class Panel extends Component {
    render() {
        const { data, pesanan, tambahPesanan, kurangPesanan, type, className, itemClassName } = this.props;
        console.log(data);
        const list = data.list.map((val, idx) => {
            const item = pesanan.find((el, idx, arr) => el.id_item === val.id_item);
            return (
                <Item key={idx}
                    className={`${itemClassName} flex-child`}
                    data={val} type={type}
                    jumlah_pesanan={(item) ? item.jumlah_pesanan : 0}
                    tambahPesanan={tambahPesanan}
                    kurangPesanan={kurangPesanan} />
            )
        })
        return (
            <div className={`${className} flex-parent flex-parent--column mx18 round bg-white border border--darken25 py12 mb18`}>
                <div className='flex-child flex-parent flex-parent--center-cross'>
                    <div className='flex-child flex-child--grow pl12'>
                        <div className='txt-h3'>{data.nama}</div>
                        <div className='txt-h4'>{data.deskripsi}</div>
                    </div>
                    <div className='flex-child pr6'>
                        <button className='btn btn--transparent color-darken50'>Lainnya</button>
                    </div>
                </div>
                <div className='flex-child flex-parent grid px6 pt6'>
                    {list}
                </div>
            </div>
        )
    }
}

export class Item extends Component {
    render() {
        const { data, jumlah_pesanan, type, className } = this.props;
        switch (type) {
            case 'vertical':
                return (
                    <div className={`${className} flex-parent flex-parent--column`}>
                        <div className='flex-child'>
                            <AspectRatio className='bg-darken10'></AspectRatio>
                        </div>
                        <div className='flex-child'>
                            <div className='txt-h4'>
                                <span>{data.nama_item}</span>
                            </div>
                        </div>
                        <div className='flex-child flex-parent flex-parent--center-cross'>
                            <div className='flex-child flex-child--grow'>
                                <Currency nilai={data.harga} prefix className='txt-l' />
                            </div>
                            <TambahKurang className='flex-child flex-child--no-shrink'
                                jumlah_pesanan={jumlah_pesanan}>
                                <buttonTambah onClick={this._tambahPesanan.bind(this, data)} />
                                <buttonKurang onClick={this._kurangPesanan.bind(this, data)} />
                            </TambahKurang>
                        </div>
                    </div >
                )
            case 'horizontal-small':
                return (
                    <div className='flex-parent flex-parent--center-cross px12'>
                        <div className='flex-child w60 py12'>
                            <AspectRatio className='bg-darken10'></AspectRatio>
                        </div>
                        <div className='flex-child flex-child--grow px12'>
                            <div className='txt-h4'>{data.nama_item}</div>
                        </div>
                        <div className='flex-child'>
                            <Currency nilai={data.harga} />
                        </div>
                        <TambahKurang className='flex-child flex-child--no-shrink'
                            jumlah_pesanan={jumlah_pesanan}>
                            <buttonTambah onClick={this._tambahPesanan.bind(this, data)} />
                            <buttonKurang onClick={this._kurangPesanan.bind(this, data)} />
                        </TambahKurang>
                    </div>
                )
            default:
                return (
                    <div className={`${className} flex-parent`}>
                        <div className='flex-child'>
                            <AspectRatio className='w120 bg-darken10'></AspectRatio>
                        </div>
                        <div className='flex-child flex-child--grow flex-parent flex-parent--column pl12'>
                            <div className='flex-child'>
                                <div className='txt-h4'>{data.nama_item}</div>
                            </div>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-s'>
                                    <Truncate>{data.deskripsi_item}</Truncate>
                                </div>
                            </div>
                            <div className='flex-child flex-child--no-shrink flex-parent'>
                                <div className='flex-child flex-child--grow'>
                                    <Currency nilai={data.harga} prefix className='txt-h3' />
                                </div>
                                <TambahKurang className='flex-child flex-child--no-shrink'
                                    jumlah_pesanan={jumlah_pesanan}>
                                    <buttonTambah onClick={this._tambahPesanan.bind(this, data)} />
                                    <buttonKurang onClick={this._kurangPesanan.bind(this, data)} />
                                </TambahKurang>
                            </div>
                        </div>
                    </div>
                )
        }
    }
    _tambahPesanan = (val) => {
        this.props.tambahPesanan(val);
    }
    _kurangPesanan = (val) => {
        this.props.kurangPesanan(val);
    }
}