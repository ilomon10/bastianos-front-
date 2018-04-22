import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import crud from '../crud'
import Currency from '../component/currency'
import pengaturan from '../component/pengaturan'

import PengaturanMakanan from './pengaturanMakanan'

export default class PengaturanMakanans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMakanan: [],
            listMinuman: []
        }
    }
    componentDidMount() {
        this.ambilMakanan('nasi.json');
        this.ambilMakanan('mie.json');
        this.ambilMinuman('minuman.json');
    }
    render() {
        const makanan = this.state.listMakanan.map((el, idx) => {
            return (
                <pengaturan.linkB key={idx} name={el.nama} to={`${this.props.match.path}/${el.nama}`} desc={<Currency nilai={el.harga} />} />
            )
        })
        const minuman = this.state.listMinuman.map((el, idx) => {
            return (
                <pengaturan.linkB key={idx} name={el.nama} to={`${this.props.match.path}/${el.nama}`} desc={<Currency nilai={el.harga} />} />
            )
        })
        return (
            <div className='flex-child flex-child--grow flex-parent'>
                <pengaturan.panel className='flex-child flex-child--grow'
                    contentClassName='bg-gray-faint scroll-auto'
                    name='Makanan dan Minuman'
                    btnRightName='Add'
                    onBtnRightClick={this._onClickAdd.bind(this)}>
                    <pengaturan.heading name='Makanan' />
                    <pengaturan.pane>
                        {makanan}
                    </pengaturan.pane>
                    <pengaturan.heading name='Minuman' />
                    <pengaturan.pane>
                        {minuman}
                    </pengaturan.pane>
                </pengaturan.panel>
                <Route path={`${this.props.match.path}/:nama`} component={PengaturanMakanan} />
            </div>
        )
    }
    ambilMakanan(a) {
        crud.ambil.makanan(a)
            .then(res => {
                let result = this.state.listMakanan;
                res.forEach(el => {
                    el.harga = el.harga * 1000;
                    result.push(el);
                })
                this.setState({
                    listMakanan: result
                })
            })
    }
    ambilMinuman(a) {
        crud.ambil.makanan(a)
            .then(res => {
                let result = this.state.listMinuman;
                res.forEach(el => {
                    el.harga = el.harga * 1000;
                    result.push(el);
                })
                this.setState({
                    listMinuman: result
                })
            })
    }
    _onClickAdd() {
        this.props.history.push(this.props.match.path + '/Tambah Baru')
    }
    _onClick(a) {
        this.props.history.push({
            search: '?tanggal=' + a[0].date
        })
    }
}