import React, { Component } from 'react'

import Icon from './icon'

class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    componentWillReceiveProps(n) {
        if (n.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: n.isOpen
            })
        }
    }
    render() {
        const { children, type } = this.props;
        let bg;
        switch (type) {
            case 'warning': bg = 'bg-red-dark'; break;
            default: bg = 'bg-white'
        }
        if(!this.state.isOpen) return <div></div>
        return (
            <div className={`${bg} round mt12 py3 px3 color-lighten50 txt-s relative`}>
                <button className='absolute top right'><Icon iconName='close' height='12' width='12' /></button>
                {children}
            </div>
        )
    }
    _hide() {

    }
}
export default DialogBox;