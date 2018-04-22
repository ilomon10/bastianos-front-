import React, { Component } from 'react'

import crud from '../crud'

import Pesanan from './pesanan'
import Nota from './nota'

export default class Kasir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesanan: [],
            pesananDipilih: {}
        }
    }
    componentDidMount() {
        this.ambilPesanan();
    }
    render() {
        return (
            <div className='fixed top right bottom left flex-parent'>
                <Nota logout={this._logout.bind(this)} pesananDipilih={this.state.pesananDipilih} />
                <div className='flex-child flex-child--grow bg-gray-faint'>
                    <Pesanan {...this.props} pesanan={this.state.pesanan} pilihPesanan={this.pilihPesanan.bind(this)} />
                </div>
            </div>
        )
    }
    ambilPesanan() {
        crud.ambil.pesanan()
            .then((res) => {
                const pesanan = res.data.map((el, idx) => {
                    return el;
                });
                this.setState({
                    pesanan
                })
            });
    }
    pilihPesanan(no_nota) {
        const pesananDipilih = this.state.pesanan.find((val, idx) => val.no_nota === no_nota);
        this.setState({
            pesananDipilih
        })
        return pesananDipilih;
    }
    _logout(){
        crud.auth.logout().then(res=>{
            if(res.status === true){
                this.props.history.push('/login')
            }
        })
    }
}