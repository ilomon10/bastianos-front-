import React, { Component } from 'react'
import styled from 'styled-components'

export default class Icon extends Component {

    render() {
        const { iconName, height, width, className } = this.props;
        const Icon = styled.div`
            display: block;
            height: ${height}px;
            width: ${width}px;
            svg {
                display: block;
                fill: currentColor;
            }
        `

        return (
            <Icon className={className}>
                <svg height={height} width={width} dangerouslySetInnerHTML={{ __html: `<use xlink:href='#icon-${iconName}'/>` }} />
            </Icon>
        )
    }
}