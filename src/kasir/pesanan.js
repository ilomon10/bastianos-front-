import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

import AspectRatio from '../component/aspectRatio';

export default class Pesanan extends Component {
    constructor(props){
        super(props);
        this.state = {
            pesananDipilih: {}
        }
    }
    render() {
        const pesanan = this.props.pesanan.map((el, idx) => {
            return (
                <div key={idx} className='flex-child col--2-mxl col--4-ml col--6 px6 py6'>
                    <AspectRatio className='w-full'>
                        <div className={`content bg-white border border--darken10 border--blue-on-active flex-parent flex-parent--column ${(this.state.pesananDipilih.nota === el.nota)? 'is-active': ''}`}
                            onClick={this._onClick.bind(this, el.no_nota)}>
                            <div className='flex-child flex-child--grow flex-parent flex-parent--center-cross flex-parent--center-main'>
                                <div className='flex-child'>
                                <span className='txt-h3'>{new Date(el.waktu).getHours()}:{new Date(el.waktu).getMinutes()}</span>
                                </div>
                            </div>
                            <div className='flex-child flex-child--no-shrink flex-parent align-center border-t border--darken10'>
                                <div className='flex-child px6 py12 border-r border--darken10'>
                                    <span>Meja #{el.no_meja}</span>
                                </div>
                                <div className='flex-child flex-child--grow px6 py12'>
                                    <div className='txt-xs'>Nota</div>
                                    <div className='txt-s'>{el.no_nota}</div>
                                </div>
                            </div>
                        </div>
                    </AspectRatio>
                </div>
            )
        })
        return (
            <div className='flex-parent grid px6 py6'>
                {pesanan}
            </div>
        )
    }
    _onClick(no_nota){
        const pesananDipilih = this.props.pilihPesanan(no_nota);
        this.setState({
            pesananDipilih
        })
    }
}