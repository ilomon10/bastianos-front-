import React from 'react'
import styled from 'styled-components'
import { color } from './color'

import Icon from '../icon'

const Container = styled.div`
    display: flex;
    border: 1pt solid ${color.links};
    border-radius: 4pt;
    > div {
        padding: 0 8pt;
        line-height: 22pt;
        font-size: 10pt;
        color: ${color.settings}
    }
    > * {
        border-left: 1pt solid ${color.links};
        &:first-child{
            border-left: none;
        }
    }
`

const Button = styled.button`
    background-color: transparent;
    color: ${color.links};
    padding: 0 8pt;
    font-size: 13pt;
`

export const Stepper = props => {
    if (props.value === '' || (typeof props.value === 'undefined' && typeof props.placeholder !== 'undefined')) {
        return (
            <Container>
                <Button onClick={props.increase}>{props.placeholder}</Button>
            </Container>
        )
    } else {
        return (
            <Container>
                {typeof props.decrease !== 'undefined' &&
                    <Button onClick={props.decrease}>
                        <Icon iconName='minus' height='24' width='24' />
                    </Button>
                }
                {typeof props.value !== 'undefined' && props.value !== '' &&
                    <div>
                        {props.value}
                    </div>
                }
                {typeof props.increase !== 'undefined' &&
                    <Button onClick={props.increase}>
                        <Icon iconName='plus' height='24' width='24' />
                    </Button>
                }
            </Container>
        )
    }
}