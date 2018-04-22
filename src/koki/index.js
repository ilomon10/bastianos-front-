import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import crud from '../crud'

import socket from '../component/socket'
import SFX from '../component/_sfx'

import Sidebar from './sidebar'
import Meja from './meja'

export default class Koki extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mejaPesanan: [],
            mejaPesananDipilih: {}
        }
    }
    componentWillMount() {
        this.ambilPesanan();
        socket.on('update', res => {
            console.log('ta triger');
            SFX().play();
            this.ambilPesanan();
        })
    }
    render() {
        console.log(this.props.match.path)
        if (this.state.mejaPesanan.length > 0) {
            return (
                <div className='fixed top right left bottom flex-parent'>
                    <Sidebar className='flex-child flex-parent flex-parent--column z1'
                        onClick={this.pilihPesanan.bind(this)}
                        mejaPesanan={this.state.mejaPesanan}
                        logout={this._logout.bind(this)} />
                    <Route path={`${this.props.match.path}/:id`} render={
                        (props) => <Meja {...props} mejaPesanan={this.state.mejaPesananDipilih}
                            mejaPesananDipilih={this.state.mejaPesananDipilih}
                            pilihPesanan={this.pilihPesanan.bind(this)}
                            donePesanan={this.donePesanan.bind(this)} />
                    } />
                    <Route exact path={`${this.props.match.path}`} render={
                        (props) => {
                            return (<Redirect to={{ pathname: `/koki/${this.state.mejaPesanan[0].no_nota.replace('/', '%2f')}` }} />)
                        }
                    } />
                </div>
            )
        } else {
            return (
                <div className='fixed top right bottom left flex-parent flex-parent--center-cross flex-parent--center-main'>
                    <Route path='/koki/' render={
                        (props) => (
                            <div className='flex-child'>
                                <div className='txt-h3'>
                                    Belum ada pesanan
                                </div>
                                <div>
                                    <button onClick={this._logout.bind(this)} className='btn px0 bg-transparent color-darken25'>Logout</button>
                                </div>
                            </div>
                        )
                    } />
                </div>
            )
        }
    }
    pilihPesanan(no_nota) {
        const result = this.state.mejaPesanan.find(el => el.no_nota === no_nota);
        this.setState({
            mejaPesananDipilih: result
        })
    }
    ambilPesanan() {
        crud.ambil.pesanan()
            .then((res) => {
                this.setState({
                    mejaPesanan: res.data
                })
            });
    }
    donePesanan(no_nota) {
        crud.donePesanan(no_nota).then(res => {
            this.props.history.push(this.props.match.path)
            this.ambilPesanan()
        })
    }
    _logout() {
        crud.auth.logout().then(res => this.props.history.push('/login'));
    }
}