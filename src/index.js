import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'
import 'react-virtualized/styles.css';

import crud from './crud'

import Pelayan from './pelayan2'
import Koki from './koki2'
import Kasir from './kasir2'
import Admin from './admin2'
import Login from './login'
import { injectGlobal, } from 'styled-components';

injectGlobal`
    body {
        font-family: Helvetica, Verdana, Arial, Sans-Serif;
    }
    .width50P{
        width: 50% !important;
    }
    .valign {
        vertical-align: middle;
    }
    .ml1 {
        margin-left: 1px !important;
    }
    .bg-pri {    
        background-color: #034b42;
    }
    .bg-sec {
        background-color: #8c8783;
    }
    .highlight {
        :focus {
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.75);
        }
    }
`

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    render() {
        return (
            <Switch>
                <Redirect exact from='/' to='login' />
                <Route name='login' path='/login' render={props => {
                    return <Login {...props} />
                }} />
                <Route name='pelayan' path='/pelayan' render={props => {
                    this._cek(props);
                    return (
                        <Switch>
                            <Route path={props.match.path + '/:nota'} component={Pelayan} />
                            <Route path={props.match.path} render={
                                props => <Redirect to='pelayan/:nota' />
                            } />
                        </Switch>
                    )
                }} />
                <Route name='koki' path='/koki' render={props => {
                    this._cek(props);
                    return (
                        <Switch>
                            <Route path={props.match.path + '/:nota'} component={Koki} />
                            <Route path={props.match.path} render={
                                props => <Redirect to='koki/:nota' />
                            } />
                        </Switch>
                    )
                }} />
                <Route name='kasir' path='/kasir' render={props => {
                    this._cek(props);
                    return (
                        <Switch>
                            <Route path={props.match.path + '/:nota'} component={Kasir} />
                            <Route path={props.match.path} render={
                                props => <Redirect to='kasir/:nota' />
                            } />
                        </Switch>
                    )
                }} />
                <Route name='admin' path='/admin' render={props => {
                    this._cek(props);
                    return <Admin {...props} />
                }} />
                <Route name='404' render={(props) => (
                    <div className='fixed top right bottom left flex-parent flex-parent--center-main flex-parent--center-cross'>
                        <div className='flex-child'>
                            <div className='txt-h1'>404</div>
                            <div className='txt-h3'>Halaman tidak ditemukan</div>
                            <Link to={'/'}>
                                {'<-'} Kembali ke halaman awal
                                    </Link>
                        </div>
                    </div>
                )} />
            </Switch>
        )
    }
    _cek = (props) => {
        crud.auth.cek()
            .then(res => {
                if (res.status) {
                    if (props.match.path !== '/' + res.data.level.toLowerCase())
                        props.history.push('/' + res.data.level.toLowerCase());
                } else {
                    props.history.push('/login');
                }
            })
    }
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);