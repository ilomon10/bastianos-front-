import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import crud from '../crud'

import HorizontalScroll from '../component/horizontalScroll'
import * as uiKits from '../component/ui-kits/'

export default class Semua extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemMenu: {},
            listItemFeatured: {}
        }
    }
    componentDidMount() {
        this.ambilItems();
    }
    render() {
        const list = Object.keys(this.state.listItemMenu).map((val, idx) => {
            return (
                <uiKits.TableViewGrouped key={idx} header={val}>
                    {
                        this.state.listItemMenu[val].map((v, i) => {
                            const pes = this.props.pesanan.find(va => va.id_item === v.id_item);
                            v.jumlah_pesanan = (typeof pes !== 'undefined') ? pes.jumlah_pesanan : undefined;
                            const tandai = this.props.tandaiItems.find(va => va.id_item === v.id_item);
                            v.tandai = (typeof tandai !== 'undefined') ? tandai.tandai : undefined;
                            return (
                                <uiKits.TableViewRow key={i} type='default'
                                    iconHit={{
                                        value: v.tandai,
                                        onClick: this._onClick.bind(this, v),
                                        onHold: this._onHold.bind(this, v)
                                    }}
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
                    }
                </uiKits.TableViewGrouped>
            )
        });
        const listFeatured = Object.keys(this.state.listItemFeatured).map((val, idx) => {
            return (
                <uiKits.TableViewGrouped key={idx} header={val}>
                    {
                        this.state.listItemFeatured[val].map((v, i) => {
                            const pes = this.props.pesanan.find(va => va.id_item === v.id_item);
                            v.jumlah_pesanan = (typeof pes !== 'undefined') ? pes.jumlah_pesanan : undefined;
                            const tandai = this.props.tandaiItems.find(va => va.id_item === v.id_item);
                            v.tandai = (typeof tandai !== 'undefined') ? tandai.tandai : undefined;
                            return (
                                <uiKits.TableViewRow key={i} type='large'
                                    iconHit={{
                                        value: v.tandai,
                                        onClick: this._onClick.bind(this, v),
                                        onHold: this._onHold.bind(this, v)
                                    }}
                                    number={i + 1}
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
                    }
                </uiKits.TableViewGrouped>
            )
        });
        return (
            <div className='flex-child flex-child--grow flex-parent'>
                <uiKits.TableView className='flex-child col--6'>
                    {list}
                </uiKits.TableView>
                <uiKits.TableView className='flex-child col--6'>
                    {listFeatured}
                </uiKits.TableView>
            </div>
        )
    }

    _onClick(val) {
        this.props.tandaiItem(val);
    }
    _onHold(val) {
        this.props.tandaiItem(val, 'reset');
    }

    ambilItems() {
        crud.ambil.items({ all: true })
            .then(res => {
                let arr = {};
                if (typeof res.data !== 'object') return;
                res.data.forEach((val) => {
                    if (arr[val.nama_kategori_item]) {
                        arr[val.nama_kategori_item].push(val);
                    } else {
                        arr[val.nama_kategori_item] = [val];
                    }
                })
                this.setState({
                    listItemMenu: arr
                })
            })
        crud.ambil.items({ popular: true, limit: 10 })
            .then(res => {
                let arr = {};
                if (typeof res.data !== 'object') return;
                res.data.forEach((val) => {
                    if (arr[val.nama_kategori_item]) {
                        arr[val.nama_kategori_item].push(val);
                    } else {
                        arr[val.nama_kategori_item] = [val];
                    }
                })
                this.setState({
                    listItemFeatured: arr
                })
            })
    }
}