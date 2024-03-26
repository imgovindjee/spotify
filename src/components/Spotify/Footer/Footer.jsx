import React from 'react'

import CurrentTrack from './CurrentTrack/CurrentTrack'
import PlayerControls from './PlayerControls/PlayerControls'
import Volume from './VolumeControls/VolumeControls'

import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer__container'>
            <CurrentTrack />
            <PlayerControls />
            <Volume />
        </div>
    )
}

export default Footer
