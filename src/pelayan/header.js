import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Route,
    NavLink
} from 'react-router-dom'

import crud from '../crud'

import Icon from '../component/icon'

// import HorizontalScroll from '../component/horizontalScroll'
import NavSearchBar from './navSearchBar'
import Cari from './cari'

const NavButton = styled(NavLink) `
    border-bottom-width: 2px;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-radius: 0;
    background-color: transparent;
    text-align: center;
    display: inline-block;
    padding: 6px 12px;
    &.active {
        border-bottom-color: white;
    }
`

export default class Header extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            searchBoxValue: ''
        }
    }
    render() {
        const { children } = this.props;
        const navList = children.props.children.map((value, index, arr) => {
            return (
                <div key={index}
                    className={`item 
                            ${(index === 0) ? 'pl18' : ''} 
                            ${(index === arr.length - 1) ? 'pr18' : ''}`}>
                    <NavButton exact to={value.props.to} className='flex-child' activeClassName='active'>
                        {value.props.children}
                    </NavButton>
                </div>
            )
        })
        return (
            <div className={`${this.props.className} bg-darken75 color-white shadow-darken25`}>
                <NavSearchBar value={this.state.searchBoxValue}
                    placeholder={'Bastianos'}
                    iconName='search'
                    onChange={this._searchBoxOnChange.bind(this)}
                    onKeyDown={this._searchBoxOnKeyDown.bind(this)} />
                <div className='flex-parent'>
                    <div className='flex-child flex-child--grow flex-parent'>
                        {navList}
                    </div>
                    <div className='flex-child pr18'>
                        <LogoutBtn {...this.props} />
                    </div>
                </div>
                <Route exact path='/pelayan/cari' render={
                    (props) => <Cari {...props} searchBox={{
                        onChange: this._searchBoxOnChange.bind(this),
                        value: this.state.searchBoxValue,
                        onKeyDown: this._searchBoxOnKeyDown.bind(this)
                    }}
                        pesanan={this.props.pesanan}
                        tambahPesanan={this.props.tambahPesanan}
                        kurangPesanan={this.props.kurangPesanan} />
                } />
            </div>
        )
    }
    _searchBoxOnKeyDown = (ev, props) => {
        if (ev.keyCode === 13) {
            props.history.push({
                pathname: '/pelayan/cari',
                search: '?q=' + ev.target.value
            })
        }
    }
    _searchBoxOnChange = (newValue) => {
        this.setState({
            searchBoxValue: newValue
        })
    }
}

class LogoutBtn extends Component {
    render() {
        return (
            <button onClick={this._logout.bind(this)} onTouchStart={this._start.bind(this)} onTouchEnd={this._end.bind(this)} className='py6'>
                <Icon iconName='logout' height='24' width='24' />
            </button>
        )
    }
    _logout(){
        crud.auth.logout().then(res => {
            console.log('end');
            if (res.status) {
                this.props.history.push('/login');
            }
        })
    }
    _start() {
        console.log('start');
        this.timeout = setTimeout(this._logout.bind(this), 5000)
    }
    _end() {
        console.log('stop');
        clearTimeout(this.timeout);
    }
}