import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import pengaturan from '../component/pengaturan'

import PengaturanMakanans from './pengaturanMakanans'
import PengaturanPenggunas from './pengaturanPenggunas'

export default class Pengaturan extends Component {
    render() {
        console.log(pengaturan);
        return (
            <div className='flex-child flex-child--grow flex-parent'>
                <pengaturan.panel className='flex-child w300' name='Setting' >
                    <pengaturan.linkA name='Makanan dan Minuman' iconName='book' to={`${this.props.match.path}makanans`} />
                    <pengaturan.linkA name='Pengguna' iconName='user' to={`${this.props.match.path}penggunas`} />
                </pengaturan.panel>
                <Switch>
                    <Route path={`${this.props.match.path}makanans`} component={PengaturanMakanans} />
                    <Route path={`${this.props.match.path}penggunas`} component={PengaturanPenggunas} />
                    <Route path={`${this.props.match.path}`} render={props => (
                        <pengaturan.panel className='flex-child flex-child--grow' contentClassName='bg-gray-faint flex-parent flex-parent--center-cross flex-parent--center-main' name='Pengaturan'>
                            <div className='flex-child txt-h3'>Pilih Pengaturan pada bagian kiri</div>
                        </pengaturan.panel>
                    )} />
                </Switch>
            </div >
        )
    }
    _onClick(a) {
        console.log('klik')
    }
}