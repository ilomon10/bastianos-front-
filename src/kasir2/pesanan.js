import React, { Component, ReactFragment } from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'

import crud from '../crud'

import * as uiKits from '../component/ui-kits'

export default class Koki extends Component {
    componentWillMount() {
    }
    render() {
        const elDom = (v, i) => (
            <uiKits.TableViewRow key={i} type='large'
                iconUrl='#'
                title={v.nama_item}
                subtitle={`Rp.${(v.harga).toLocaleString('de-DE')}`}
                with={{
                    type: 'value',
                    value: v.jumlah_pesanan
                }}
            />
        );
        const list = this.props.parentState.pesanan.map(elDom)
        const listDiproses = this.props.parentState.pesananDiproses.map(elDom);
        const listSelesai = this.props.parentState.pesananSelesai.map(elDom);
        const listDibayar = this.props.parentState.pesananDibayar.map(elDom);

        const hargaPesanan = this.props.hitungHargaPesanan();
        return (
            <div className='flex-child flex-child--grow flex-parent flex-parent--column'>
                <uiKits.TableView className='flex-child flex-child--grow'>
                    {list.length !== 0 &&
                        <uiKits.TableViewGrouped header='Diorder'>
                            {list}
                        </uiKits.TableViewGrouped>
                    }
                    {listDiproses.length !== 0 &&
                        <uiKits.TableViewGrouped header='Diproses'>
                            {listDiproses}
                        </uiKits.TableViewGrouped>
                    }
                    {listSelesai.length !== 0 &&
                        <uiKits.TableViewGrouped header='Selesai'>
                            {listSelesai}
                        </uiKits.TableViewGrouped>
                    }
                    {listDibayar.length !== 0 &&
                        <uiKits.TableViewGrouped header='Dibayar'>
                            {listDibayar}
                        </uiKits.TableViewGrouped>
                    }
                </uiKits.TableView>
                <div className='flex-child flex-child--no-shrink flex-parent flex-parent--column'>
                    <div className='flex-parent px12'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-l'>Subtotal</div>
                        </div>
                        <div className='flex-child txt-l'>
                            {hargaPesanan.subtotal}
                        </div>
                    </div>
                    <div className='flex-parent px12'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-l'><span>Pajak</span> <span className='color-red'>(10%)</span></div>
                        </div>
                        <div className='flex-child txt-l'>
                            {hargaPesanan.pajak}
                        </div>
                    </div>
                    <div className='flex-parent px12 border-t border--darken10'>
                        <div className='flex-child flex-child--grow'>
                            <div className='txt-xl'>Total</div>
                        </div>
                        <div className='flex-child txt-xl'>
                            {hargaPesanan.total}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onClick() {
        console.log('taklik');
    }
}