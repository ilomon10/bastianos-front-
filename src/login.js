import React, { Component } from 'react'

import crud from './crud'
import DialogBox from './component/dialogBox'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isOpen: false
        }
    }
    componentDidMount() {
        crud.auth.cek()
            .then(res => {
                if(res.status === true){
                    this.props.history.push(res.data.level);
                }
            })
    }
    render() {
        return (
            <div className='fixed top right bottom left bg-pri flex-parent flex-parent--center-cross flex-parent--center-main'>
                <div className='flex-child align-center'>
                    <img src='/img/logo.png' alt='logo' className='w180 h180 inline-block pb12' />
                    <form onSubmit={e => { this._submit.bind(this); e.preventDefault() }}>
                        <input onChange={this._username.bind(this)} className='block highlight w-full py6 pl6 mb12 border--darken25 color-white bg-lighten10' type='text' placeholder='Username' />
                        <input onChange={this._password.bind(this)} className='block highlight w-full py6 pl6 mb12 border--darken25 color-white bg-lighten10' type='password' placeholder='Password' />
                        <button disabled={this.state.username === '' && this.state.password === ''}
                            onClick={this._submit.bind(this)}
                            className='block w-full bg-sec align-center py6 txt-bold color-white'>Login</button>
                    </form>
                    <DialogBox isOpen={this.state.isOpen === 1} type='warning'>
                        Coba lagi
                    </DialogBox>
                    <DialogBox isOpen={this.state.isOpen === 0} type='warning'>
                        Server sedang error.
                    </DialogBox>
                </div>
            </div>
        )
    }
    _username = e => {
        this.setState({
            username: e.target.value
        })
    }
    _password = e => {
        this.setState({
            password: e.target.value
        })
    }
    _submit = () => {
        crud.auth.login(this.state.username, this.state.password).then(res => {
            if (res.status === true) {
                this.props.history.push(res.data.level);
            } else {
                this.setState({
                    isOpen: true
                })
            }
        }).catch(res=>{
        })
    }
}