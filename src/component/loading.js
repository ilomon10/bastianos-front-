import React, { Component } from 'react'
import Modal from 'react-modal'

// import { Link } from 'react-router-dom'

Modal.setAppElement('#app');

class Loading extends Component {
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
        // if (!this.state.isOpen) return <div></div>
        return (
            <Modal
                isOpen={this.state.isOpen}
                className={{
                    base: 'flex-child flex-parent flex-parent--column bg-white round',
                    afterOpen: '',
                    beforeClose: ''
                }}
                overlayClassName={{
                    base: 'fixed top right bottom left bg-darken50 flex-parent flex-parent--center-cross flex-parent--center-main',
                    afterOpen: '',
                    beforeClose: ''
                }}>
                <div className='flex-child flex-parent flex-parent--center-cross py12 pl6 pr12'>
                    Tunggu sebentar
                </div>
            </Modal>
        )
    }
}
export default Loading;