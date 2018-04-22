import styled from 'styled-components'
import { color } from './color'

export * from './color'
export * from './tableView'
export * from './segmentControl'
export * from './dialog'

export const bar = styled.div`
    ${props => {
        if (typeof props.top !== 'undefined') {
            return `border-bottom: 1pt solid ${color.lines};`
        }
        if (typeof props.bottom !== 'undefined') {
            return `border-top: 1pt solid ${color.lines};`
        }
    }}
    background-color: #efefef;
    align-items: center;
    padding: 0 8pt;
    display: flex;
    flex-shrink: 0;
    z-index: 1;

    > * {
        flex-shrink: 0;
        vertical-align: middle;
    }
    a,
    button {
        text-align: center;
    }

    .title {
        padding: 0 8pt;
        font-size: 17pt;
        color: ${color.text};
    }
    .subtitle {
        padding: 0 8pt;
        font-size: 12pt;
        color: ${color.settings};
    }

    input {
        margin: 8pt 0;
        background-color: ${color.lines};
        border: none;
    }
    
    > .barCenter {
        flex-grow: 1;
        padding: 0 8pt;
        text-align: center;
    }
    > .barRight {
        display: flex;
        flex-shrink: 0;
        width: 25%;
        text-align: right;
        justify-content: flex-end;
    }
    > .barLeft {
        display: flex;
        flex-shrink: 0;
        width: 25%;
    }
`

export const video = styled.video`
    display: block;
    background-color: ${color.lines};
`

export const actionButton = styled.button`
    background-color: transparent;
    color: ${color.links};
    margin: 8pt 0;
    padding: 0 8pt;
    font-size: 17pt;
    white-space: nowrap;
    line-height: 29pt;
    transition: 200ms ease;

    &:active {
        background-color: ${color.lines};
    }
    &:disabled {
        color: ${color.lines};
        cursor: not-allowed;
    }
`

export const input = styled.input`
    background-color: white;
    border: 1pt solid ${color.lines};
    font-size: 14pt;
    line-height: 29pt;
    padding: 0 8pt;
    width: 100%;
    border-radius: 5pt;
    opacity: 0.5;
    transition: 150ms ease-out;

    &:active,
    &.active,
    &:focus {
        opacity: 1;
    }
`

export const tabBar = styled.div`
    display: flex;
    justify-content: center;

    ${bar} > & {
        flex-grow: 1;
        padding: 0 8pt;
        text-align: center;
    }

    > div {
        flex-grow: 1;
        text-align: center;
        > a,
        > button {
            vertical-align: middle;
            display: inline-block;
            padding: 0 8pt;
            color: ${color.settings};
            > div {
                white-space: nowrap;
                font-size: 10pt;
                text-align: center;
            }
            &.active {
                color: ${color.links};
            }
        }
    }
`