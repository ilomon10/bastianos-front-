import React, { Component } from 'react'

import socket from '../component/socket'
import SFX from '../component/_sfx'

import AspectRatio from '../component/aspectRatio'

export default class Meja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mejaPesananDipilih: {
                no_meja: undefined,
                list_pesanan: []
            },
            diorder: [],
            selesai: [],
        }
    }
    componentDidMount() {
        this.props.pilihPesanan(this.props.match.params.id.replace('%2f', '/'));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.mejaPesananDipilih !== this.state.mejaPesananDipilih) {
            if (nextProps.mejaPesananDipilih.list_pesanan) {
                const diorder = nextProps.mejaPesananDipilih.list_pesanan.filter((el, idx) => el.status === 'Diorder');
                const selesai = nextProps.mejaPesananDipilih.list_pesanan.filter((el, idx) => el.status === 'Selesai' || el.status === 'diproses');
                this.setState({
                    diorder,
                    selesai
                })
                console.log(diorder, selesai);
            }
            this.setState({
                mejaPesananDipilih: nextProps.mejaPesananDipilih
            })
        }
    }
    render() {
        const lists = (el, idx) => {
            return (
                <div key={idx} className='flex-parent flex-parent--center-cross px12'>
                    <div className='flex-child w60 py12'>
                        <AspectRatio className='bg-darken10'></AspectRatio>
                    </div>
                    <div className='flex-child flex-child--grow px12'>
                        <div className='txt-h4'>{el.nama_item}</div>
                    </div>
                    <div className='flex-child px12'>
                        <div className='txt-h4'>x{el.jumlah_pesanan}</div>
                    </div>
                </div>
            )
        }
        const makananList = this.state.diorder.map(lists)
        const minumanList = this.state.selesai.map(lists)
        return (
            <div className='flex-child flex-child--grow flex-parent flex-parent--column border-l border--gray-faint ml-neg1'>
                <div className='flex-child flex-parent flex-parent--center-cross'>
                    <div className='flex-child flex-child--grow px12 py6'>
                        <span className='txt-h3'>No. {this.props.match.params.id.replace('%2f', '/')}</span>
                    </div>
                    <div className='flex-child px12'>
                        <button onClick={this.donePesanan.bind(this)} className='btn btn--transparent color-blue'>Selesai</button>
                    </div>
                </div>
                <div className='flex-child flex-child--grow'>
                    <div className='color-darken50 px12'>
                        <div className='txt-l border-b border--darken10'>Makanan</div>
                    </div>
                    {makananList}
                    <div className='color-darken50 px12'>
                        <div className='txt-l border-b border--darken10'>Minuman</div>
                    </div>
                    {minumanList}
                </div>
            </div>
        )
    }
    donePesanan() {
        console.log(this.state);
        this.props.donePesanan(this.state.mejaPesananDipilih.no_nota);
    }
}