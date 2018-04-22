import React, { Component } from 'react'

import AspectRatio from '../component/aspectRatio'
import Currency from '../component/currency'
import pengaturan from '../component/pengaturan'

export default class PengaturanMakanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMakanan: [],
            listMinuman: [],
            namaMakanan: '',
            hargaMakanan: '',
            kategoriMakanan: '',
            historiHarga: [
                {
                    tanggal: '10 - Desember - 2017 07:30pm',
                    harga: 10000
                },
                {
                    tanggal: '10 - Desember - 2017 07:30pm',
                    harga: 20000
                }
            ]
        }
    }
    componentDidMount() {
        this.setState({
            namaMakanan: this.props.match.params.nama
        })
    }
    componentWillReceiveProps(n) {
        if (n.match.params.nama !== this.state.nama) {
            this.setState({
                namaMakanan: n.match.params.nama
            })
        }
    }
    render() {
        const historiHarga = this.state.historiHarga.map((el, idx) => {
            return (
                <div key={idx} className='grid px6 pt6'>
                    <div className='col--6'>
                        {el.tanggal}
                    </div>
                    <div className='col--6'>
                        <Currency nilai={el.harga} />
                    </div>
                </div>
            )
        })
        return (
            <pengaturan.panel className='flex-child flex-child--grow'
                contentClassName='bg-gray-faint scroll-auto'
                name={this.props.match.params.nama}
                btnRightName='Save' 
                onBtnRightClick={this._onClick.bind(this)}
                btnLeftName='Hapus' 
                onBtnLeftClick={this._onClick.bind(this)}>
                <div className='px30 pt30 flex-parent flex-parent--center-cross flex-parent--center-main'>
                    <div className='flex-child'>
                        <AspectRatio className='w120'>
                            <div className='content bg-white'></div>
                        </AspectRatio>
                    </div>
                    <div className='flex-child'>
                        <div className='txt-l txt-bold pl12'>
                            Ganti Foto
                            </div>
                    </div>
                </div>
                <pengaturan.pane className='pt30'>
                    <pengaturan.inputB label='Nama' value={this.state.namaMakanan} onChange={this._onChange.bind(this)} />
                    <pengaturan.inputB label='Deskripsi' value={this.state.namaMakanan} onChange={this._onChange.bind(this)} />
                    <pengaturan.inputC type='number' label='Harga' value={this.state.hargaMakanan} onChange={this._onChangeHarga.bind(this)}>
                        {historiHarga}
                    </pengaturan.inputC>
                    <pengaturan.select name='Kategori' value={this.state.kategoriMakanan} onChange={this._onChangeKategori.bind(this)}>
                        <option value=''>Pilih</option>
                        <option value='makanan'>Makanan</option>
                        <option value='minuman'>Minuman</option>
                    </pengaturan.select>
                    <pengaturan.select name='Grup' value={this.state.kategoriMakanan} onChange={this._onChangeKategori.bind(this)}>
                        <option value=''>Pilih</option>
                        <option value='makanan'>Makanan</option>
                        <option value='minuman'>Minuman</option>
                    </pengaturan.select>
                </pengaturan.pane>
            </pengaturan.panel>
        )
    }
    _onClick(a) {
        console.log(a);
    }
    _onChange(ev) {
        this.setState({
            namaMakanan: ev.target.value
        })
    }
    _onChangeHarga(ev) {
        this.setState({
            hargaMakanan: ev.target.value
        })
    }
    _onChangeKategori(ev) {
        this.setState({
            kategoriMakanan: ev.target.value
        })
    }
}