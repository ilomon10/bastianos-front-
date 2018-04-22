import React, { Component } from 'react'
import Modal from 'react-modal'

import crud from '../crud'

import TambahKurang from './tambahKurang'
import AspectRatio from '../component/aspectRatio'
import Icon from '../component/icon'
import Currency from '../component/currency'
import Loading from '../component/loading'

Modal.setAppElement('#app');

export default class Pesanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            dialog: false,
            no_meja: 0,
            servisTip: 0,
            pesan: false,
            loading: false
        }
    }
    render() {
        const { pesanan } = this.props;
        const makanan = pesanan.filter((el, idx, arr) => el.group === 'Makanan')
            .reduce((acc, cur, idx, arr) => {
                const jumlah_pesanan = cur.jumlah_pesanan + acc.jumlah_pesanan;
                const harga = cur.jumlah_pesanan * cur.harga + acc.harga;
                const list = acc.list;
                list.push(cur);
                return { jumlah_pesanan, harga, list };
            }, { jumlah_pesanan: 0, harga: 0, list: [] });
        const minuman = pesanan.filter((el, idx, arr) => el.group === 'Minuman')
            .reduce((acc, cur, idx, arr) => {
                const jumlah_pesanan = cur.jumlah_pesanan + acc.jumlah_pesanan;
                const harga = cur.jumlah_pesanan * cur.harga + acc.harga;
                const list = acc.list;
                list.push(cur);
                return { jumlah_pesanan, harga, list };
            }, { jumlah_pesanan: 0, harga: 0, list: [] });
        const totalHarga = makanan.harga + minuman.harga;
        const pajak = totalHarga * (10 / 100);
        const { servisTip } = this.state;
        const totalKeseluruhan = totalHarga + pajak + servisTip;
        const makananList = makanan.list.map((el, idx) => {
            return (
                <div key={idx} className='flex-parent flex-parent--center-cross px12'>
                    <div className='flex-child w60 py12'>
                        <AspectRatio className='bg-darken10'></AspectRatio>
                    </div>
                    <div className='flex-child flex-child--grow px12'>
                        <div className='txt-h4'>{el.nama_item}</div>
                    </div>
                    <Currency nilai={el.harga} />
                    <TambahKurang className='flex-child flex-child--no-shrink'
                        jumlah_pesanan={el.jumlah_pesanan}>
                        <buttonTambah onClick={this._tambahPesanan.bind(this, el)} />
                        <buttonKurang onClick={this._kurangPesanan.bind(this, el)} />
                    </TambahKurang>
                </div>
            )
        })
        const minumanList = minuman.list.map((el, idx) => {
            return (
                <div key={idx} className='flex-parent flex-parent--center-cross px12'>
                    <div className='flex-child w60 py12'>
                        <AspectRatio className='bg-darken10'></AspectRatio>
                    </div>
                    <div className='flex-child flex-child--grow px12'>
                        <div className='txt-h4'>{el.nama_item}</div>
                    </div>
                    <Currency nilai={el.harga} />
                    <TambahKurang className='flex-child flex-child--no-shrink'
                        jumlah_pesanan={el.jumlah_pesanan}>
                        <buttonTambah onClick={this._tambahPesanan.bind(this, el)} />
                        <buttonKurang onClick={this._kurangPesanan.bind(this, el)} />
                    </TambahKurang>
                </div>
            )
        })
        return (
            <div className={`${this.props.className} bg-darken75 color-white shadow-darken25`}>
                <div className='flex-parent px18'>
                    <div className='flex-child flex-parent py6'>
                        <div className='flex-child'>
                            <div className='txt-m'>Makanan</div>
                        </div>
                        <div className='flex-child pr24 pl6'>
                            <div className='txt-h3'>
                                <span>{makanan.jumlah_pesanan}</span> (<Currency nilai={makanan.harga} prefix />)
                            </div>
                        </div>
                    </div>
                    <div className='flex-child flex-parent py6'>
                        <div className='flex-child'>
                            <div className='txt-m'>Minuman</div>
                        </div>
                        <div className='flex-child pr24 pl6'>
                            <div className='txt-h3'>
                                <span>{minuman.jumlah_pesanan}</span> (<Currency nilai={minuman.harga} prefix />)
                            </div>
                        </div>
                    </div>
                    <div className='flex-child flex-parent py6'>
                        <div className='flex-child'>
                            <div className='txt-m'>Total</div>
                        </div>
                        <div className='flex-child pr24 pl6'>
                            <Currency className='txt-h3' nilai={totalHarga} prefix />
                        </div>
                    </div>
                    <div className='flex-child flex-child--grow'></div>
                    <button className='flex-child btn btn--gray btn-l unround'
                        onClick={this._openModal.bind(this)}
                    >Lihat</button>
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    className={{
                        base: 'fixed top right bottom left bg-white flex-parent flex-parent--column',
                        afterOpen: '',
                        beforeClose: ''
                    }}
                    overlayClassName={{
                        base: 'fixed top right bottom left bg-darken50',
                        afterOpen: '',
                        beforeClose: ''
                    }}>
                    <div className='flex-child flex-child--no-shrink flex-parent flex-parent--center-cross border-b border--darken10'>
                        <div className='flex-child'>
                            <button className='btn btn--transparent color-darken50 unround px12 py12'
                                onClick={this._closeModal.bind(this)}>
                                <Icon iconName='close' height='30' width='30' />
                            </button>
                        </div>
                        <div className='flex-child px12'>
                            <div className='txt-h4'>Tagihan</div>
                        </div>
                        <div className='flex-child flex-child--grow'></div>
                        <div className='flex-child flex-child--no-shrink pr6'>
                            <button className='btn btn--transparent color-blue txt-h4'>
                                <div onClick={this._openDialog.bind(this)} className='flex-child'>Pesan</div>
                            </button>
                        </div>
                    </div>
                    <div className='flex-child flex-child--grow py12 scroll-auto'>
                        <div className='flex-parent flex-parent--column'>
                            <div className='flex-child color-darken50 px12'>
                                <div className='txt-l border-b border--darken10'>Makanan</div>
                            </div>
                            {(makananList.length === 0) ? <div className='flex-child txt-m px12'>Tidak ada pesanan</div> : makananList}
                        </div>
                        <div className='flex-parent flex-parent--column'>
                            <div className='flex-child color-darken50 px12'>
                                <div className='txt-l border-b border--darken10'>Minuman</div>
                            </div>
                            {(minumanList.length === 0) ? <div className='flex-child txt-m px12'>Tidak ada pesanan</div> : minumanList}
                        </div>
                    </div>
                    <div className='flex-child flex-child--no-shrink py12'>
                        <div className='flex-parent px12'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-l'>Subtotal</div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-l' nilai={totalHarga} />
                            </div>
                        </div>
                        <div className='flex-parent px12'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-l'><span>Pajak</span> <span className='color-red'>(10%)</span></div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-l' nilai={pajak} />
                            </div>
                        </div>
                        <div className='flex-parent px12 border-t border--darken10'>
                            <div className='flex-child flex-child--grow'>
                                <div className='txt-xl'>Total</div>
                            </div>
                            <div className='flex-child'>
                                <Currency className='txt-xl' nilai={totalKeseluruhan} />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.dialog}
                    className={{
                        base: 'flex-child flex-parent flex-parent--column bg-white',
                        afterOpen: '',
                        beforeClose: ''
                    }}
                    overlayClassName={{
                        base: 'fixed top right bottom left bg-darken50 flex-parent flex-parent--center-cross flex-parent--center-main',
                        afterOpen: '',
                        beforeClose: ''
                    }}>
                    <div className='flex-child flex-parent flex-parent--center-cross py12 pl6 pr12'>
                        <div className='flex-child pt12 pb6 pl6 pr12'>
                            <span className='txt-h2'>Meja No.</span>
                        </div>
                        <div className='flex-child py12 pb6 pr6'>
                            <input onChange={e => this.setState({ no_meja: e.target.value })} value={this.state.no_meja} type='number' className='input py24 w120 txt-h2 align-center' />
                        </div>
                    </div>
                    <div className='flex-child flex-parent flex-parent--end-main pl6 pr12'>
                        <div className='flex-child py12 pr6'>
                            <button onClick={this._closeDialog.bind(this)} className='btn bg-transparent round color-blue color-darken10-on-hover'>Batal</button>
                        </div>
                        <div className='flex-child py12 pr6'>
                            <button onClick={this._pesan.bind(this)} className='btn round'>Pesan</button>
                        </div>
                    </div>
                </Modal>
                <Loading isOpen={this.state.loading} />
            </div>
        )
    }
    _pesan() {
        const list_pesanan = this.props.pesanan.map(el => {
            return {
                id_item: el.id_item,
                jumlah_pesanan: el.jumlah_pesanan
            }
        })
        this.setState({
            loading: true
        })
        crud.pesanItems({
            no_meja: this.state.no_meja,
            list_pesanan
        }).then(res => {
            if (res.status) {
                this.props.pesan();
                this.setState({
                    dialog: false,
                    modalOpen: false,
                    no_meja: 0
                })
            }
            this.setState({
                loading: false
            })
        })
    }
    _openDialog() {
        this.setState({
            dialog: true
        })
    }
    _closeDialog() {
        this.setState({
            dialog: false
        })
    }
    _tambahPesanan(item) {
        this.props.tambahPesanan(item)
    }
    _kurangPesanan(item) {
        this.props.kurangPesanan(item)
    }
    _openModal() {
        this.setState({
            modalOpen: true
        })
    }
    _closeModal() {
        this.setState({
            modalOpen: false
        })
    }
}