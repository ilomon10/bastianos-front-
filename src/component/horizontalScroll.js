import styled from 'styled-components'

const HorizontalScroll = styled.div`
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;

    > .item {
        flex: 0 0 auto !important;
    }
`

export default HorizontalScroll