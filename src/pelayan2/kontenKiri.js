import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import crud from '../crud'

import HorizontalScroll from '../component/horizontalScroll'

export default class KontenKiri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotaPesanan: []
        }
    }
    componentWillMount() {
        this.ambilPesanan();
    }
    render() {
        return (
            <div className='fixed top right bottom left flex-parent'>
                <div className='flex-child flex-parent'>
                    <div className='flex-child'>Sidebar</div>
                    <div className='flex-child'>Content</div>
                </div>
            </div>
        )
    }
    ambilPesanan() {
        crud.ambil.pesanan()
            .then(res => {
                console.log(res);
                this.setState(res.data);
            })
    }
}