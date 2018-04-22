import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import crud from '../crud'

import HorizontalScroll from '../component/horizontalScroll'
import * as uiKits from '../component/ui-kits/'

export default class Cari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemMenu: [],
            cari: ''
        }
    }
    componentDidMount() {
        this.serachBar.focus();
    }
    render() {
        const list = this.state.listItemMenu.map((v, i) => {
            const pes = this.props.parentState.pesanan.find(va => va.id_item === v.id_item);
            v.jumlah_pesanan = (typeof pes !== 'undefined') ? pes.jumlah_pesanan : undefined;
            return (
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
            )
        })
        return (
            <div className='fixed top left right bottom flex-parent flex-parent--column z1 bg-white'>
                <uiKits.bar top>
                    <div className='flex-child--grow'>
                        <uiKits.input innerRef={el => this.serachBar = el} type='text' placeholder='Cari'
                            value={this.state.cari}
                            onChange={this._searchBarOnChange.bind(this)}
                            onKeyDown={this._searchBarOnKeyDown.bind(this)} />
                    </div>
                    <div>
                        <uiKits.actionButton onClick={this.kembali.bind(this)}>Kembali</uiKits.actionButton>
                    </div>
                </uiKits.bar>
                <div className='flex-child flex-child--grow flex-parent flex-parent--column'>
                    <uiKits.TableView className='flex-child flex-child--grow'>
                        {list}
                    </uiKits.TableView>
                </div>
            </div>
        )
    }
    _searchBarOnChange(el) {
        this.setState({
            cari: el.target.value
        })
    }
    _searchBarOnKeyDown(el) {
        if (el.key === 'Enter' || el.keyCode === 13) {
            this.cariItems();
        }
    }
    kembali() {
        this.props.history.push(`${this.props.parentRoute.match.url}`)
    }
    cariItems() {
        crud.cariItems(this.state.cari)
            .then(res => {
                this.setState({
                    listItemMenu: res.data
                })
            })
    }
}