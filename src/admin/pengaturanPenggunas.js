import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import crud from '../crud'

import pengaturan from '../component/pengaturan'

import PengaturanPengguna from './pengaturanPengguna'

export default class PengaturanPenggunas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPengguna: []
        }
    }
    componentWillMount(){
        this.ambilPengguna();
    }
    render() {
        const listPengguna = (el,idx)=>(
            <pengaturan.linkB key={idx} name={el.username} to={`${this.props.match.path}/${el.id_pengguna}`} desc={el.nama_pengguna} />
        )
        const listAdmin = this.state.listPengguna.filter(el=>el.level==='Admin').map(listPengguna);
        const listKasir = this.state.listPengguna.filter(el=>el.level==='Kasir').map(listPengguna);
        const listPelayan = this.state.listPengguna.filter(el=>el.level==='Pelayan').map(listPengguna);
        const listKoki = this.state.listPengguna.filter(el=>el.level==='Koki').map(listPengguna);
        return (
            <div className='flex-child flex-child--grow flex-parent'>
                <pengaturan.panel className='flex-child flex-child--grow'
                    contentClassName='bg-gray-faint scroll-auto'
                    name='Makanan dan Minuman'
                    btnRightName='Add'
                    onBtnRightClick={this._onClickAdd.bind(this)}>
                    {listAdmin.length > 0 &&
                        <div>
                            <pengaturan.heading name='Admin' />
                            <pengaturan.pane>
                                {listAdmin}
                            </pengaturan.pane>
                        </div>}
                    {listKasir.length > 0 &&
                        <div>
                            <pengaturan.heading name='Kasir' />
                            <pengaturan.pane>
                                {listKasir}
                            </pengaturan.pane>
                        </div>}
                    {listPelayan.length > 0 &&
                        <div>
                            <pengaturan.heading name='Pelayan' />
                            <pengaturan.pane>
                                {listPelayan}
                            </pengaturan.pane>
                        </div>}
                    {listKoki.length > 0 &&
                        <div>
                            <pengaturan.heading name='Koki' />
                            <pengaturan.pane>
                                {listKoki}
                            </pengaturan.pane>
                        </div>}
                </pengaturan.panel>
                <Route path={`${this.props.match.path}/:id_penggunan`} component={PengaturanPengguna} />
            </div>
        )
    }
    ambilPengguna(){
        crud.ambil.pengguna().then(res=>{
            if(res.status === true){
                this.setState({
                    listPengguna: res.data
                })
            }
        })
    }
    _onClickAdd(a) {
        this.props.history.push(this.props.match.path + '/Tambah Pengguna')
    }
}