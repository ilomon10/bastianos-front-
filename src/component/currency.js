import React, { Component } from 'react'
import styled from 'styled-components'

const Sup = styled.span`
    font-size: 51%;
    bottom: 1.4ex;
`
const Sub = styled.span`
    font-size: 51%;
    top: 0;
`

class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nilai: 0
        }
    }
    render() {
        const { className, prefix } = this.props;
        const nilai = this._formater(this.props.nilai);
        let result;
        if (typeof prefix === 'undefined' || prefix === false) {
            result = (
                <span>
                    <Sup className='txt-sup'>Rp.</Sup>
                    <span>{(parseInt(this.props.nilai, 10)).toLocaleString('de-DE')}</span>
                </span>
            )
        } else {
            result = (
                <span>
                    <Sup className='txt-sup'>Rp.</Sup>
                    <span>{nilai[0].toLocaleString('de-DE')}</span>
                    <Sub className='txt-sub'>{nilai[1]}</Sub>
                </span>
            )
        }
        return (
            <span className={className}>
                {result}
            </span>
        )
    }
    _formater = (a) => {
        const num = parseInt(a, 10);
        if (typeof num === 'number') {
            if (num > 999999) {
                return [(num / 1000000), 'jt']
            } else if (num > 999) {
                return [(num / 1000), 'k']
            } else {
                return [num, ''];
            }
        }
    }
}
export default Currency;