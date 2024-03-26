import React from 'react'

import axios from 'axios'

import { useStateProvider } from '../../../../utils/StateProvider'

import './VolumeControls.scss'


const Volume = () => {

    const [{ token }] = useStateProvider();

    const setVolume = async (e) => {
        await axios.put(
            `https://api.spotify.com/v1/me/player/volume`,
            {},
            {
                params: {
                    volume_percent: parseInt(e.target.value)
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        )
    }

    return (
        <div className='volume__container'>
            <input type="range" min={0} max={100} onMouseUp={e => setVolume(e)} />
        </div>
    )
}

export default Volume
