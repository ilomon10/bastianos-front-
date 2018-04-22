import React, { Component } from 'react'
import Modal from 'react-modal'

import crud from '../crud'

import NavSearchBar from './navSearchBar'
import { Item } from './panel'

Modal.setAppElement('#app');

export default class Cari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasil: []
        }
    }
    componentWillMount() {
        this.ambilData(new URLSearchParams(this.props.location.search).get('q'));
    }
    componentWillReceiveProps(n){
        this.ambilData(new URLSearchParams(n.location.search).get('q'));
    }
    render() {
        const { pesanan } = this.props;
        const searchBox = this.props.searchBox;
        console.log(this.state.hasil);
        const hasil = this.state.hasil.map((val, idx, arr) => {
            const item = pesanan.find((el, idx, arr) => el.unique === val.unique);
            return (
                <Item key={idx}
                    className='px18 py6'
                    data={val}
                    type='horizontal-small'
                    jumlah_pesanan={(item) ? item.jumlah_pesanan : 0}
                    tambahPesanan={this._tambahPesanan.bind(this, val)}
                    kurangPesanan={this._kurangPesanan.bind(this, val)} />
            )
        })
        return (    
            <Modal
                isOpen={true}
                className={{
                    base: 'fixed top right bottom left flex-parent flex-parent--column bg-gray-faint',
                    afterOpen: '',
                    beforeClose: ''
                }}
                overlayClassName={{
                    base: 'fixed top right bottom left bg-darken50',
                    afterOpen: '',
                    beforeClose: ''
                }}>
                <NavSearchBar className='flex-child flex-child--no-shrink'
                    iconName='chevron-left'
                    value={searchBox.value}
                    placeholder={'Cari'}
                    btnOnClick={this._btnOnClick.bind(this)}
                    onChange={this._onChange.bind(this)}
                    onKeyDown={this._onKeyDown.bind(this)} />
                <div className='flex-child flex-child--grow scroll-auto'>
                    {hasil}
                </div>
            </Modal>
        )
    }
    _tambahPesanan = (item) => {
        this.props.tambahPesanan(item);
    }
    _kurangPesanan = (item) => {
        this.props.tambahPesanan(item);
    }
    _onKeyDown = (ev, props) => {
        this.props.searchBox.onKeyDown(ev, props);
        if (ev.keyCode === 13) {
            this.ambilData();
        }
    }
    _onChange = (a) => {
        this.props.searchBox.onChange(a);
    }
    _btnOnClick = (n) => {
        this.props.history.push('/pelayan');
    }
    ambilData(params) {
        crud.cariItems(params)
            .then((res) => {
                if (res.status) {
                    const result = res.data.map((el, idx) => {
                        el.unique = el.id_item;
                        return el;
                    })
                    this.setState({
                        hasil: result
                    })
                    console.log(this.state);
                }
            });
    }
}