import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import crud from '../crud'

import HorizontalScroll from '../component/horizontalScroll'
import _404 from '../component/_404'

import Header from './header'
import Pesanan from './pesanan'
import Panel from './panel'

export default class Pelayan extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            makanan: [],
            minuman: [],
            pesanan: []
        }
    }
    componentDidMount() {
        this._ambilItem('Nasi', 'Lorem ipsum');
    }
    render() {
        const { pesanan } = this.state;
        const featureContent = this.state.list.map((val, idx) => {
            return (
                <div key={idx} className='flex-child px18 py18'>
                    <div className='h180 w300 bg-white round shadow-darken25'>bijon {val}/{this.state.list.length}</div>
                </div>
            )
        })
        const makananList = Object.keys(this.state.makanan).map((val, idx) => {
            return (
                <Panel className='flex-child' itemClassName='col--6 px6 pb12'
                    key={idx} data={{
                        nama: val,
                        list: this.state.makanan[val]
                    }} pesanan={this.state.pesanan}
                    tambahPesanan={this._tambahPesanan.bind(this)}
                    kurangPesanan={this._kurangPesanan.bind(this)} />
            )
        })
        const minumanList = Object.keys(this.state.minuman).map((val, idx) => {
            return (
                <Panel type='vertical' className='flex-child' itemClassName='col--3 px6 pb12'
                    key={idx} data={{
                        nama: val,
                        list: this.state.minuman[val]
                    }} pesanan={this.state.pesanan}
                    tambahPesanan={this._tambahPesanan.bind(this)}
                    kurangPesanan={this._kurangPesanan.bind(this)} />
            )
        })

        return (
            <div className='fixed top right left bottom flex-parent flex-parent--column' >
                <Header className='flex-child flex-child--no-shrink'
                    history={this.props.history}
                    pesanan={this.state.pesanan}
                    tambahPesanan={this._tambahPesanan.bind(this)}
                    kurangPesanan={this._kurangPesanan.bind(this)}>
                    <navList>
                        <div to={{
                            pathname: `${this.props.match.path}`
                        }}>
                            {`Utama`}
                        </div>
                        <div to={{
                            pathname: `${this.props.match.path}/makanan`
                        }}>
                            {`Makanan`}
                        </div>
                        <div to={{
                            pathname: `${this.props.match.path}/minuman`
                        }}>
                            {`Minuman`}
                        </div>
                    </navList>
                </Header>
                <div className='flex-child flex-child--grow bg-gray-faint scroll-auto relative'>
                    <Switch>
                        <Route exact path={`${this.props.match.path}`} render={() => (
                            <div className='pt18'>
                                {makananList}
                                {minumanList}
                            </div>
                        )} />
                        <Route exact path={`${this.props.match.path}/makanan`} render={() => (
                            <div className='pt18'>
                                {makananList}
                            </div>
                        )} />
                        <Route exact path={`${this.props.match.path}/minuman`} render={() => (
                            <div className='pt18'>
                                {minumanList}
                            </div>
                        )} />
                        <Route name='404' path={`${this.props.match.path}`} component={_404} />
                    </Switch>
                </div>
                <Pesanan className='flex-child flex-child--no-shrink'
                    {...this.props}
                    pesanan={pesanan}
                    pesan={this._pesan.bind(this)}
                    tambahPesanan={this._tambahPesanan.bind(this)}
                    kurangPesanan={this._kurangPesanan.bind(this)}>
                </Pesanan>
            </div>
        )
    }

    _ambilItem(nama, deskripsi) {
        crud.ambil.items()
            .then((res) => {
                let makanan = {};
                let minuman = {};
                res.data.filter(el => el.group === 'Makanan').map(el => {
                    if (makanan.hasOwnProperty(el.nama_kategori_item)) {
                        makanan[el.nama_kategori_item].push(el);
                    } else {
                        makanan[el.nama_kategori_item] = [];
                        makanan[el.nama_kategori_item].push(el);
                    }
                    return el;
                })
                res.data.filter(el => el.group === 'Minuman').map(el => {
                    if (minuman.hasOwnProperty(el.nama_kategori_item)) {
                        minuman[el.nama_kategori_item].push(el);
                    } else {
                        minuman[el.nama_kategori_item] = [];
                        minuman[el.nama_kategori_item].push(el);
                    }
                    return el;
                })
                this.setState({
                    makanan: makanan,
                    minuman: minuman
                })
            });
    }

    _tambahPesanan(item) {
        const pesanan = this.state.pesanan;
        if (typeof pesanan.find((el, idx, arr) => el.id_item === item.id_item) === 'undefined') {
            item.jumlah_pesanan = 0;
            pesanan.push(item);
        }
        pesanan.forEach((el, idx, arr) => {
            if (el.id_item === item.id_item) {
                pesanan[idx].jumlah_pesanan = pesanan[idx].jumlah_pesanan + 1;
            }
        })
        this.setState({
            pesanan
        })
        console.log(this.state.pesanan);
    }
    _kurangPesanan(item) {
        this.state.pesanan.forEach((el, idx, arr) => {
            if (el.id_item === item.id_item) {
                arr[idx].jumlah_pesanan = arr[idx].jumlah_pesanan - 1;
            }
        })
        const pesanan = this.state.pesanan.filter((el, idx) => {
            return el.jumlah_pesanan !== 0;
        })
        this.setState({
            pesanan
        })
    }
    _pesan() {
        this.setState({
            pesanan: []
        })
    }
}