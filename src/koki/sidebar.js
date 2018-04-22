import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
    }
    render() {
        const { className } = this.props;
        const list = this.props.mejaPesanan.map((el, idx) => {
            return (
                <NavLink key={idx}
                    activeClassName='is-active'
                    className='btn btn--transparent flex-child unround px12 py12 bg-gray-faint-on-active color-black border-b border--gray-faint txt-h3'
                    onClick={this.props.onClick.bind(this, el.no_nota)}
                    to={{ pathname: '/koki/' + el.no_nota.replace('/', '%2f') }} >
                    {el.no_meja}
                </NavLink>
            )
        })
        return (
            <div className={className}>
                <div className='flex-child bg-gray-dark color-white px12 py6'>
                    <span className='txt-h3'>Pesanan</span>
                </div>
                <div className='flex-child flex-child--grow flex-parent flex-parent--column'>{list}</div>
                <div className='flex-child px12 py6'>
                    <button onClick={this.props.logout} className='btn round'>Logout</button>
                </div>
            </div>
        )
    }
    _onClick(no_nota) {
        this.props.onClick(no_nota);
    }
}