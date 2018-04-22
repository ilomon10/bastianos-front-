import React, { Component } from 'react'

import crud from '../crud'
import CalendarGraph from '../component/calendarGraph'

import Notas from './rekapanNotas'
import Nota from './rekapanNota'

export default class Rekapan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notas: [],
            notaMinggu: [],
            tahun: ''
        }
    }
    componentDidMount() {
        this.setState({
            tahun: this.props.match.params.tahun
        }, this.ambilRekapanPesanan)
    }
    render() {
        return (
            <div className='flex-child flex-child--grow flex-parent flex-parent--column'>
                <div className='flex-child flex-child--grow flex-parent'>
                    <Nota className='flex-child flex-child--no-shrink border-r border--gray-light'
                        notaDipilih={this.state.notaDipilih} />
                    <Notas className='flex-child flex-child--grow'
                        notas={this.state.notas}
                        notaDipilih={this.state.notaDipilih} />
                </div>
                <div className='flex-child px12 py12 shadow-darken10 z2 relative'>
                    <div className='pt24 pl24 absolute top left z1'>
                        <div className='select-container'>
                            <select className='select' value={this.state.tahun} onChange={this._onChangeTahun.bind(this)}>
                                <option style={{ display: 'none' }}>Tahun</option>
                                <option value={2014}>2014</option>
                                <option value={2013}>2013</option>
                                <option value={2012}>2012</option>
                                <option value={2011}>2011</option>
                            </select>
                            <div className='select-arrow'></div>
                        </div>
                    </div>
                    <CalendarGraph onClick={this._onClick.bind(this)} data={this.state.notas} color='red' />
                </div>
            </div>
        )
    }
    _onChangeTahun(ev) {
        const tahun = ev.target.value;
        this.setState({
            tahun: tahun
        }, () => {
            this.ambilNotas();
            this.props.history.push('/admin/rekapan/' + tahun);
        })
    }
    ambilRekapPesananPerHari(waktu) {
        const w = new Date(waktu).getFullYear() + '-' + (new Date(waktu).getMonth() + 1) + '-' + new Date(waktu).getDate();
        crud.rekapPesanan(
            w,
            w
        ).then(res => {
            console.log(res);
        })
    }
    ambilRekapanPesanan() {
        crud.ambil.rekapPesanan(
            this.state.tahun + '-1-1',
            this.state.tahun + '-12-31',
        ).then(res => {
            if (res.status) {
                let not = {};
                res.data.forEach(el => {
                    var date = new Date(el.waktu)
                    var parse = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                    if (not.hasOwnProperty(parse)) {
                        not[parse] += 1
                    } else {
                        not[parse] = 1
                    }
                })
                const notas = Object.keys(not).map(key => {
                    return {
                        Date: new Date(key),
                        Comparison_Type: not[key]
                    };
                });
                this.setState({
                    notas
                })
            }
        })
    }
    _onClick(a) {
        this.props.history.push({
            search: '?tanggal=' + a[0].date
        })
    }
}