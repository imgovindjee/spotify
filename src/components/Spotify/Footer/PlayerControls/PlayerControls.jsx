import React from 'react'
import axios from 'axios'

import {
    BsFillPauseCircleFill,
    BsFillPlayCircleFill,
    BsShuffle
} from "react-icons/bs"
import {
    CgPlayTrackNext,
    CgPlayTrackPrev
} from 'react-icons/cg'
import {
    FiRepeat
} from 'react-icons/fi'

import { useStateProvider } from '../../../../utils/StateProvider'
import { reducerCases } from '../../../../utils/Constants'


import './PlayerControls.scss'



const PlayerControls = () => {

    const [{ token, playerState }, dispatch] = useStateProvider();


    // onClick handlers

    // chnaging the track for "forward" and "backward"
    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        )
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })

        const response = await axios.get(
            `https://api.spotify.com/v1/me/player/currently-playing`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        )
        if (response.data != "") {
            const { item } = response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artist) => artist.name),
                image: item.album.images[2].url,
            }
            // console.log(currentlyPlaying);
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null })
        }
    }



    // changing the state of the "play" and "pause" button
    const changeState = async () => {
        const state = playerState ? "pause" : "play";

        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        )
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState })
    }





    return (
        <div className='playercontrols__container'>
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="state">
                {
                    playerState ?
                        <BsFillPauseCircleFill onClick={changeState} />
                        :
                        <BsFillPlayCircleFill onClick={changeState} />
                }
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </div>
    )
}

export default PlayerControls
