import styled from 'styled-components'
import { color } from './color'

export const segmentControl = styled.div`
    background-color: transparent;
    border: 1pt solid ${color.links};
    border-radius: 5pt;
    display: flex;
    margin: 8pt 0;

    > a,
    > button {
        color: ${color.links};
        border-left: 1pt solid ${color.links};
        background-color: transparent;
        font-size: 13pt;
        line-height: 29pt;
        min-width: 25%;
        flex-grow: 1;
        text-align: center;
        white-space: nowrap;
        
        &:first-child {
            border-left: none;
        }

        &.active {
            color: white;
            background-color: ${color.links};
        }
    }
`