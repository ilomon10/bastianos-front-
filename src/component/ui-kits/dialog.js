import React, { Children } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import { actionButton, color } from './index'

import Icon from '../icon'

Modal.setAppElement('#app')

const Container = styled.div`
    background-color: ${color.background};
    border-radius: 14pt;
    width: 270pt;
    text-align: center;
    overflow: hidden;

    .title {
        line-height: 29pt;
        font-size: 17pt;
        font-weight: bold;
    }
    .subtitle {
        font-size: 13pt;
    }
    input {
        margin-top: 15pt;
    }
`

const Wrapper = styled.div`
    padding: 15pt;

    > div:last-child {
        padding-bottom: 0;
    }
`

const ActionWrapper = styled.div`
    display: flex;
    > a, button {
        border-top: 1px solid ${color.lines};
        border-left: 1px solid ${color.lines};
        flex-grow: 1;
        text-align: center;
        margin: 0;
        padding: 8pt;

        &:first-child {
            border-left: none;
        }
    }
`

export const Alerts = props => {
    let actionButtons = [];
    let children = [];
    Children.forEach(props.children, child => {
        if (!React.isValidElement(child)) return;
        if (actionButton === child.type) {
            actionButtons.push(child);
        } else {
            children.push(child);
        }
    })
    return (
        <Modal
            isOpen={props.isOpen}
            className={{
                base: 'flex-child flex-parent flex-parent--column',
                afterOpen: '',
                beforeClose: ''
            }}
            overlayClassName={{
                base: 'fixed top right bottom left bg-darken50 flex-parent flex-parent--center-cross flex-parent--center-main',
                afterOpen: '',
                beforeClose: ''
            }}>
            <Container className='flex-child flex-parent flex-parent--column'>
                <Wrapper>
                    {children}
                </Wrapper>
                <ActionWrapper>
                    {actionButtons}
                </ActionWrapper>
            </Container>
        </Modal>
    )
}