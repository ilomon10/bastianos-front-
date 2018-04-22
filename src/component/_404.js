import React from 'react'

import { Link } from 'react-router-dom'

export default ({ match }) => {
    return (
        <div className='absolute top right bottom left flex-parent flex-parent--center-main flex-parent--center-cross'>
            <div className='flex-child'>
                <div className='txt-h1'>404</div>
                <div className='txt-h3'>Halaman tidak ditemukan</div>
                <Link to={`${match.path}`}>{'<-'} Kembali ke halaman awal</Link>
            </div>
        </div>
    )
}