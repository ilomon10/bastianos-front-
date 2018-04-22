import React, { Component } from 'react'
import styled from 'styled-components'
import {
    withRouter
} from 'react-router-dom'

import Icon from '../component/icon'

const SearchBar = styled.div`
    padding: 0px 18px;
    > .flex-child {
        padding-top: 12px;
        padding-bottom: 6px;
    }
    .input {
        box-shadow: none;
    }
`

const Input = withRouter((props) => {
    const { className, placeholder, onChange, onKeyDown, value } = props;
    const _keyDown = (ev) => {
        onKeyDown(ev, props)
    }
    return (
        <input className={className}
            type='text'
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={_keyDown} />
    )
})

class NavSearchBar extends Component {
    render() {
        const { value, placeholder, className, iconName } = this.props;
        return (
            <SearchBar className={`${className} flex-parent`}>
                <div className='flex-child'>
                    <button className='btn round-l bg-white color-black' onClick={this._btnOnClick.bind(this)}>
                        <Icon iconName={iconName} height='24' width='24' />
                    </button>
                </div>
                <div className='flex-child flex-child--grow'>
                    <Input className='input bg-white unround-l border--0 px0'
                        type='text'
                        value={value}
                        placeholder={placeholder}
                        onChange={this._onChange.bind(this)}
                        onKeyDown={this._onKeyDown.bind(this)} />
                </div>
            </SearchBar>
        )
    }
    _onKeyDown = (ev, props) => {
        if (typeof this.props.onKeyDown === 'function') this.props.onKeyDown(ev, props);
    }
    _onChange = (e, c) => {
        if (typeof this.props.onChange === 'function') this.props.onChange(e.target.value, e);
    }
    _btnOnClick = () => {
        if (typeof this.props.btnOnClick === 'function') this.props.btnOnClick('bijon');
    }
}

export default NavSearchBar