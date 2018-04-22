import React from 'react'
import styled from 'styled-components'
import { color } from './color'

import { Stepper } from './stepper'

export const View = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 15pt;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 15pt;
        bottom: 15pt;
        width: 1pt;
        background-color: ${color.lines};
    }
    > div {
        height: 100%;
        overflow-x: auto;
    }
`
export const TableView = props => (
    <View className={props.className}>
        <div>
            {props.children}
        </div>
    </View>
)

const Grouped = styled.div`
    margin-bottom: 15pt;
    > h1 {
        color: ${color.settings};
        font-size: 13pt;
        padding: 0 15pt;
        text-transform: uppercase;
    }
`
export const TableViewGrouped = props => (
    <Grouped>
        <h1>
            {props.header}
        </h1>
        {props.children}
    </Grouped>
)

const RowNumber = styled.div`
    font-size: 17pt;
`

const RowTitle = styled.div`
    font-size: 17pt;
`
const RowSubtitle = styled.div`
    font-size: 15pt;
`
const RowIcon = styled.img`
    flex-shrink: 0;
    height: ${props => props.size};
    width: ${props => props.size};
    background-color: ${color.background};
    border-radius: 8px;
`
const RowIconHitButton = styled.button`
    flex-shrink: 0;
    flex-grow: 0 !important;
    display: block !important;
    height: ${props => props.size};
    width: ${props => props.size};
    background-color: ${color.background};
    border-radius: 8px;
`
class RowIconHit extends React.Component {
    render() {
        const { className, children, size } = this.props;
        return <RowIconHitButton size={size}
            className={className}
            onTouchStart={this._start.bind(this)}
            onTouchEnd={this._end.bind(this)}
            onClick={this._click.bind(this)}>
            {children}
        </RowIconHitButton>
    }
    _click(ev) {
        this.props.onClick(ev);
    }
    _hold(){
        this.props.onHold();
    }
    _start() {
        console.log('start');
        this.timeout = setTimeout(this._hold.bind(this), 1500)
    }
    _end() {
        console.log('stop');
        clearTimeout(this.timeout);
    }
}
const Row = styled.div`
    background-color: white;
    display: flex;
    padding: 0 15pt;
    align-items: center;
    .value {
        font-size: 17pt;
        color: ${color.settings};
    }
    > div {
        flex-grow: 1;
        display: flex;
        padding: 8pt 0;
        margin-left: 15pt;
        align-items: center;

        ${Grouped} & {
            border-bottom: 1pt solid ${color.lines};
        }

        > div:first-child {
            padding-right: 15pt;
            flex-grow: 1;
        }
    }
    > ${RowNumber} {
        flex-grow: 0;
        flex-shrink: 0;
        margin: 0;
        margin-right: 8pt;
        border: none !important;
    }
    > ${RowIcon},
    > ${RowIconHitButton} {
        position: relative;
        ${props => {
        if (props.type === 'large') {
            return `height: 44pt; width: 44pt;`;
        } else if (props.type === 'default') {
            return `height: 29pt; width: 29pt;`;
        }
    }}
        margin: 8pt 0;
        > div {
            font-size: 12pt;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -25%;
            margin-left: -15%;
        }
    }
    ${RowSubtitle}{
        ${props => {
        if (props.type === 'large') {
            return `font-size: 15pt`;
        } else if (props.type === 'default') {
            return `font-size: 12pt`;
        }
    }}
    }
    &:last-child > div {
        border-bottom: none;
    }
`


export const TableViewRow = props => {
    // console.log(props.with.value);
    return (
        <Row type={props.type}>
            {props.number &&
                <RowNumber>{props.number}</RowNumber>
            }
            {props.iconHit &&
                <RowIconHit size='29pt'
                    onHold={props.iconHit.onHold.bind(this)}
                    onClick={props.iconHit.onClick.bind(this)}>
                    <div>{props.iconHit.value}</div>
                </RowIconHit> ||
                <RowIcon size='29pt' url={props.iconUrl} />
            }
            <div>
                <div>
                    <RowTitle>
                        <span>
                            {props.title}
                        </span>
                    </RowTitle>
                    <RowSubtitle>
                        {props.subtitle}
                    </RowSubtitle>
                </div>
                {typeof props.with !== 'undefined' &&
                    <div>
                        {props.with.type === 'stepper' &&
                            <Stepper placeholder={props.with.placeholder} increase={props.with.increase} decrease={props.with.decrease}
                                value={props.with.value} />
                        }
                        {props.with.type === 'value' &&
                            <div className='value'>{props.with.value} item</div>
                        }
                    </div>
                }
            </div>
        </Row>
    )
}