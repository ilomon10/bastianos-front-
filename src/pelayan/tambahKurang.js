import React, { Component } from 'react'

import Icon from '../component/icon'

export default class TambahKurang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jumlah_pesanan: 0
        }
    }
    render() {
        const { className, jumlah_pesanan } = this.props;
        return (
            <div className={`${className} flex-parent flex-parent--center-cross`}>
                <div className='flex-child'>
                    <button onClick={this._kurang.bind(this)} className='btn btn--transparent round-l color-darken50 px6'>
                        <Icon iconName='minus' height='24' width='24' />
                    </button>
                </div>
                <div className='flex-child flexw-child--grow'>
                    <div className='txt-l align-center'>{jumlah_pesanan}</div>
                </div>
                <div className='flex-child'>
                    <button onClick={this._tambah.bind(this)} className='btn btn--transparent round-r color-darken50 px6'>
                        <Icon iconName='plus' height='24' width='24' />
                    </button>
                </div>
            </div>
        )
    }
    _tambah = () => {
        this.setState({
            jumlah_pesanan: this.props.jumlah_pesanan + 1
        }, this._onSetState('buttonTambah'));
    }
    _kurang = () => {
        if (this.state.jumlah_pesanan > 0) {
            this.setState({
                jumlah_pesanan: this.props.jumlah_pesanan - 1
            }, this._onSetState('buttonKurang'))
        } else {
            this.props.children
                .filter((el, idx, arr) => el.type === 'buttonKurang')[0]
                .props.onClick(this.state.jumlah_pesanan);
        }
    }
    _onSetState = (btn) => () => {
        if (typeof this.props.onChange === 'function') this.props.onChange(this.state.jumlah_pesanan);
        this.props.children
            .filter((el, idx, arr) => el.type === btn)[0]
            .props.onClick(this.state.jumlah_pesanan);
    }
}