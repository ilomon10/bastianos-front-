import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Instascan from '../../node_modules/instascan/instascan'
import styled from 'styled-components'

import crud from '../crud'
import socket from '../component/socket'

import * as uiKits from '../component/ui-kits/'

console.log(Instascan);

const Video = styled.div`
    position: relative;
    overflow: hidden;
    &:after{
        content: " ";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/img/line_scanner2.png');
        transform: rotate(180deg);
        background-size: 100%;
        background-repeat: no-repeat;
        animation-name: scanning, scanning-opa;
        animation-duration: 2.5s, 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    > button {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        background: white;
        font-size: 12pt;
        border: none;
        z-index: 2
    }
    @keyframes scanning {
        from {
            bottom: 100%;
        }
        to {
            bottom: -100%;
        }
    }
    @keyframes scanning-opa{
        0%{
            opacity: 0.5;
        }
        50%{
            opacity: 0.6;
        }
        100%{
            opacity: 0.5;
        }
    }
`

export default class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
            camera: 0
        }
    }
    componentDidMount() {
        console.log(this.videoDom);
        this.instascan = new Instascan.Scanner({ video: this.videoDom, mirror: false });
        this.instascan.addListener('scan', content => {
            this.props.onScan(content);
            this.instascan.stop();
        })
        Instascan.Camera.getCameras().then((cameras) => {
            if (cameras.length > 0) {
                this.instascan.start(cameras[0]);
                this.setState({
                    camera: 0
                })
                if (cameras.length > 1) {
                    this.setState({
                        switch: true
                    })
                }
            } else {
                console.log('error');
            }
        })
    }
    render() {
        return (
            <Video>
                {this.state.switch &&
                    <button onClick={this._onClick.bind(this)}>Switch</button>
                }
                <uiKits.video innerRef={el => this.videoDom = el}></uiKits.video>
            </Video>
        )
    }

    _onClick(val) {
        Instascan.Camera.getCameras().then(cameras => {
            let i = this.state.camera;
            if (this.state.camera == cameras.length - 1) i = 0;
            else i = this.state.camera + 1;
            this.instascan.stop();
            this.instascan.start(cameras[i]);
            this.setState({
                camera: i
            })
        })
    }
}