import React, { Component } from 'react'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'

import crud from '../crud'
import * as uiKits from '../component/ui-kits/'

import Rekapan from './rekapan'
import Pengaturan from './pengaturan'

export default class Admin extends Component {
    render() {
        return (
            <div className='fixed top right bottom left flex-parent flex-parent--column'>
                <uiKits.bar top>
                </uiKits.bar>
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