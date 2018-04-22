import React, { Component } from 'react'

import AspectRatio from '../component/aspectRatio';
import Currency from '../component/currency';

export default class Notas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notas: [],
            notaDipilih: {}
        }
    }
    componentWillReceiveProps(n) {
        if (n.notas !== this.state.notas) this.setState({ notas: n.notas })
        if (n.notaDipilih !== this.state.notasDipilih) this.setState({ notaDipilih: n.notaDipilih })
    }
    render() {
        const { className } = this.props;
        const notas = this.state.notas.map((el, idx) => {
            console.log(el);
            return (
                <div key={idx} className='col--3 px6 py6'>
                    <AspectRatio className='w-full'>
                        <div className={`content bg-white border border--darken10 border--blue-on-active flex-parent flex-parent--column`}>
                            <div className='flex-child flex-child--grow flex-parent flex-parent--center-cross flex-parent--center-main'>
                                <div className='flex-child'>
                                    <span className='txt-h3'><Currency nilai={el.harga} /></span>
                                </div>
                            </div>
                            <div className='flex-child flex-parent flex-parent--center-cross flex-parent--center-main'>
                                <div className='flex-child'>
                                    <span className='txt-h4'>Nota #{el.no_nota}</span>
                                </div>
                            </div>
                            <div className='flex-child flex-child--no-shrink flex-parent align-center border-t border--darken10'>
                                <div className='flex-child px6 py12 border-r border--darken10'>
                                    <span>Meja #{el.no_meja}</span>
                                </div>
                                <div className='flex-child flex-child--grow px6 py12'>
                                    <span>10:10pm</span>
                                </div>
                            </div>
                        </div>
                    </AspectRatio>
                </div>
            )
        })
        return (
            <div className={`${className} grid scroll-auto bg-gray-faint px6 py6`}>
                {notas}
            </div>
        )
    }
}