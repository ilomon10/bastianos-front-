import React, { Component } from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'

import crud from '../crud'

export default class Koki extends Component {
    componentWillMount() {
    }
    render() {
        const list = this.props.parentState.listNotaPesanan.map((el, idx) => {
            return (
                <NavLink key={idx}
                    activeClassName='is-active'
                    className='btn btn--transparent flex-child unround px12 py12 bg-gray-faint-on-active color-black border-b border--gray-faint txt-h3'
                    // onClick={this.props.onClick.bind(this, el.no_nota)}
                    to={{ pathname: '/koki/' + el.no_nota.replace('/', '%2f') }} >
                    {el.no_meja}
                </NavLink>
            )
        })
        return (
            <div className='flex-child flex-child--no-shrink flex-parent flex-parent--column'>
                <div className='flex-child txt-xl px12 py6'>Pesanan</div>
                <div className='flex-child flex-child--grow txt-xl flex-parent flex-parent--column'>
                    {list}
                </div>
                <div className='flex-child txt-xl px12 py6'>
                    <button className='btn' onClick={this._logout.bind(this)}>Logout</button>
                </div>
            </div>
        )
    }
    _logout() {
        crud.auth.logout().then(res => {
            this.props.parentProps.history.push('/login');
        });
    }
}