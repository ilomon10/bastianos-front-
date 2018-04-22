import React, { Component } from 'react'
import styled from 'styled-components'

import * as reactRoute from 'react-router-dom'

import AspectRatio from '../component/aspectRatio'
import Icon from '../component/icon'
import Currency from './currency';

const panel = ({
    name,
    children,
    className,
    contentClassName,
    btnRightName,
    onBtnRightClick,
    btnLeftName,
    onBtnLeftClick
}) => {
    return (
        <div className={`${className} flex-parent flex-parent--column bg-white border-l border--gray-light`}>
            <div className='flex-child flex-child--no-shrink flex-parent txt-l txt-bold align-center py6 px12 border-b border--gray-light'>
                {(btnLeftName && onBtnLeftClick) &&
                    <div className='flex-child'>
                        <button className='btn btn--s btn--transparent color-blue' onClick={onBtnLeftClick}>{btnLeftName}</button>
                    </div>}
                <div className='flex-child flex-child--grow'>
                    <span>{name}</span>
                </div>
                {(btnRightName && onBtnRightClick) &&
                    <div className='flex-child'>
                        <button className='btn btn--s btn--transparent color-blue' onClick={onBtnRightClick}>{btnRightName}</button>
                    </div>}
            </div>
            <div className={`${contentClassName} flex-child flex-child--grow pb120 ml1`}>
                {children}
            </div>
        </div>
    )
}

const pane = ({ children, className }) => {
    return (
        <div className={`px30 pt6 ${className}`}>
            <div className='bg-white px12'>
                {children}
            </div>
        </div>
    )
}

const heading = ({ name }) => {
    return (
        <div className='px30 pt30'>
            <div className='txt-m txt-bold txt-uppercase'>
                {name}
            </div>
        </div>
    )
}

const linkA = ({ name, iconName, to }) => {
    return (
        <reactRoute.NavLink to={to} activeClassName='is-active'
            className='flex-parent flex-parent--center-cross cursor-pointer border-b border--gray-faint bg-gray-faint-on-active'>
            <div className='flex-child'>
                <AspectRatio className='w60'>
                    <div className='content px6 py6'>
                        <Icon iconName={iconName} width='50' height='50' />
                    </div>
                </AspectRatio>
            </div>
            <div className='flex-child'>
                <div className='txt-m txt-bold'>
                    <span>{name}</span>
                </div>
            </div>
        </reactRoute.NavLink>
    )
}
const linkB = ({ name, desc, iconName, to }) => {
    return (
        <div className='flex-parent flex-parent--center-cross border-b border--gray-faint'>
            <div className='flex-child py6'>
                <AspectRatio className='w60'>
                    <div className='content bg-gray-faint'></div>
                </AspectRatio>
            </div>
            <div className='flex-child flex-child--grow py6 pl12'>
                <div className='txt-m txt-bold'>{name}</div>
            </div>
            <div className='flex-child py6 pl12'>
                <div className='txt-m color-gray'>
                    {desc}
                </div>
            </div>
            <reactRoute.NavLink to={to} className='flex-child py6 pl12'>
                <div className='txt-m color-black'>
                    <Icon iconName='chevron-right' height='24' width='24' />
                </div>
            </reactRoute.NavLink>
        </div>
    )
}
const Select = styled.select`
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    padding-right: 36px;
    margin-right: -36px;
`
const select = ({ name, value, children, onChange }) => {
    return (
        <div className='flex-parent flex-parent--center-cross border-b border--gray-faint'>
            <div className='flex-child flex-child--grow py6'>
                <div className='txt-m txt-bold'>{name}</div>
            </div>
            <div className='flex-child py6 pl12'>
                <Select dir='rtl' className='txt-m color-gray cursor-pointer' value={value} onChange={onChange}>
                    {children}
                </Select>
            </div>
            <div className='flex-child py6 pl12'>
                <div className='txt-m color-black'>
                    <Icon iconName='chevron-right' height='24' width='24' />
                </div>
            </div>
        </div>
    )
}
const inputB = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }
    render() {
        const { value, onChange, type, placeholder } = this.props;
        let label;
        if (this.props.label) label = (
            <div className='flex-child flex-child--no-shrink py6 pr12'>
                <div className='txt-m txt-bold'>{this.props.label}</div>
            </div>
        )
        if (!this.state.isEdit) {
            return (
                <div className='flex-parent flex-parent--center-cross border-b border--gray-faint'>
                    {label}
                    <div className='flex-child flex-child--grow py6 align-r'>
                        {!type &&
                            <div className='txt-m'>{(value) ? value : placeholder}</div>
                        }
                    </div>
                    <button className='flex-child py6 pl12'
                        onClick={this._onClick.bind(this, true)}>
                        <div className='txt-m color-black'>
                            <Icon iconName='chevron-right' height='24' width='24' />
                        </div>
                    </button>
                </div>
            )
        } else {
            return (
                <div className='flex-parent flex-parent--center-cross border-b border--gray-faint'>
                    {label}
                    <div className='flex-child flex-child--grow py6'>
                        <input className='input align-r px0 py0 shadow-lighten10 border-b border--gray-light'
                            placeholder={placeholder}
                            type={type}
                            value={value}
                            onChange={onChange} />
                    </div>
                    <button className='flex-child py6 pl12'
                        onClick={this._onClick.bind(this, false)}>
                        <div className='txt-m color-black'>
                            <Icon iconName='chevron-left' height='24' width='24' />
                        </div>
                    </button>
                </div>
            )
        }
    }
    _onClick(bool) {
        this.setState({
            isEdit: bool
        })
    }
}
const inputC = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }
    render() {
        const { value, onChange, placeholder, type, children } = this.props;
        let label;
        if (this.props.label) label = (
            <div className='flex-child flex-child--no-shrink py6 pr12'>
                <div className='txt-m txt-bold'>{this.props.label}</div>
            </div>
        )
        if (!this.state.isEdit) {
            return (
                <div className='flex-parent flex-parent--center-cross border-b border--gray-faint'>
                    {label}
                    <div className='flex-child flex-child--grow py6 align-r'>
                        <div className='txt-m'><Currency nilai={value} /></div>
                    </div>
                    <button className='flex-child py6 pl12'
                        onClick={this._onClick.bind(this, true)}>
                        <div className='txt-m color-black'>
                            <Icon iconName='chevron-right' height='24' width='24' />
                        </div>
                    </button>
                </div>
            )
        } else {
            return (
                <div className='flex-parent flex-parent--column border-b border--gray-faint'>
                    <div className='flex-child flex-parent flex-parent--center-cross'>
                        {label}
                        <div className='flex-child flex-child--grow py6'>
                            <input type={type} className='input align-r px0 py0 shadow-lighten10 border-b border--gray-light'
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange} />
                        </div>
                        <button className='flex-child py6 pl12'
                            onClick={this._onClick.bind(this, false)}>
                            <div className='txt-m color-black'>
                                <Icon iconName='chevron-left' height='24' width='24' />
                            </div>
                        </button>
                    </div>
                    <div className='flex-child bg-gray-faint mb6 pb6'>
                        {children}
                    </div>
                </div>
            )
        }
    }
    _onClick(bool) {
        this.setState({
            isEdit: bool
        })
    }
}

export default {
    panel,
    pane,
    heading,
    linkA,
    linkB,
    inputB,
    inputC,
    select,
}