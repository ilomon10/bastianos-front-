import React, { Component } from 'react'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'

import crud from '../crud'

import Rekapan from './rekapan'
import Pengaturan from './pengaturan'

export default class Admin extends Component {
    render() {
        return (
            <div className='fixed top right bottom left flex-parent flex-parent--column'>
                <div className='flex-child flex-child--no-shrink flex-parent border-b border--gray-light'>
                    <div className='flex-child flex-child--grow flex-parent'>
                        <NavLink activeClassName='is-active' to='/admin/rekapan'
                            className='flex-child btn btn--transparent bg-white color-darken50 unround border-b border-b--2 border--transparent border--darken25-on-active'>
                            <span>Rekapan</span>
                        </NavLink>
                        <NavLink activeClassName='is-active' exact to='/admin/pengaturan'
                            className='flex-child btn btn--transparent bg-white color-darken50 unround border-b border-b--2 border--transparent border--darken25-on-active'>
                            <span>Settings</span>
                        </NavLink>
                    </div>
                    <div className='flex-child flex-child--no-shrink'>
                        <button onClick={this._logout.bind(this)} className='btn btn--transparent bg-white color-darken50 unround border-b border-b--2 border--transparent'>Logout</button>
                    </div>
                </div>
                <Switch>
                    <Route path='/admin/rekapan/:tahun' component={Rekapan} />
                    <Route path='/admin/pengaturan/' component={Pengaturan} />
                    <Route path='/admin' render={props => <Redirect {...props} to={`/admin/rekapan/${new Date().getFullYear()}`} />} />
                </Switch>
            </div>
        )
    }
    _updateData = (data) => {
    }
    _logout = ()=>{
        crud.auth.logout().then(res => {
            this.props.history.push('/login');
        })
    }
}