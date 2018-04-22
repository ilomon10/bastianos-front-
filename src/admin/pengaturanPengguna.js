import React, { Component } from 'react'

import crud from '../crud'

import AspectRatio from '../component/aspectRatio'
import pengaturan from '../component/pengaturan'

export default class PengaturanPengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_pengguna: undefined,
            level: undefined,
            nama_pengguna: undefined,
            username: undefined
        }
    }
    componentDidMount(){
    }
    componentWillReceiveProps(n){
        if(n.match.params){
            if(n.match.params.id_pengguna !== this.state.id_pengguna){
                const pengguna = n.list_pengguna.find(el=>el.id_pengguna===n.match.params.id_pengguna);
                this.setState({
                    id_pengguna: pengguna.id_pengguna,
                    level: pengguna.level,
                    nama_pengguna: pengguna.nama_pengguna,
                    username: pengguna.username
                })
            }
        }
    }
    render() {
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
                    <pengaturan.inputB label='Nama Lengkap' value={this.state.nama} onChange={this._onChange.bind(this)} />
                    <pengaturan.inputB label='Username' value={this.state.nama} onChange={this._onChange.bind(this)} />
                    <pengaturan.inputB type='password' label='Password' value={this.state.nama} onChange={this._onChange.bind(this)} />
                </pengaturan.pane>
            </pengaturan.panel>
        )
    }
    _onClick(a) {
        console.log(a);
    }
    _onChange(ev) {
        this.setState({
            nama: ev.target.value
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