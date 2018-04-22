import styled from 'styled-components'

const AspectRatio = styled.div`
    background-color: transparent;
    width: 100%;
    padding-top: 100%;
    position: relative;

    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

export default AspectRatio;