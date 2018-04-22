import React, { Component, ReactFragment } from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'

import crud from '../crud'

import * as uiKits from '../component/ui-kits'

export default class Koki extends Component {
    componentWillMount() {
    }
    render() {
        const list = this.props.parentState.pesanan.map((v, i) => (
            <uiKits.TableViewRow key={i} type='large'
                iconUrl='#'
                title={v.nama_item}
                subtitle={`Rp.${(v.harga).toLocaleString('de-DE')}`}
                with={{
                    type: 'stepper',
                    placeholder: 'Proses',
                    decrease: this.props.prosesPesanan.bind(this, v),
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
                    type: 'stepper',
                    placeholder: 'Selesai',
                    decrease: this.props.donePesanan.bind(this, v),
                    value: v.jumlah_pesanan
                }}
            />
        ))
        return (
            <uiKits.TableView className='flex-child flex-child--grow'>
                <uiKits.TableViewGrouped header='Diorder'>
                    {list}
                </uiKits.TableViewGrouped>
                <uiKits.TableViewGrouped header='Diproses'>
                    {listReady}
                </uiKits.TableViewGrouped>
            </uiKits.TableView>
        )
    }

    _onClick() {
        console.log('taklik');
    }
}