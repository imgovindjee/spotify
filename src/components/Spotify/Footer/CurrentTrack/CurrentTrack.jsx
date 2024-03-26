import React, { useEffect } from 'react'

import axios from 'axios';

import { useStateProvider } from '../../../../utils/StateProvider'
import { reducerCases } from '../../../../utils/Constants';


import './CurrentTrack.scss'




const CurrentTrack = () => {

    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/me/player/currently-playing`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }
                },
            )
            console.log(response);

            if (response.data != null) {
                const { item } = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                }
                console.log(currentlyPlaying);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
            }
        }

        getCurrentTrack();
    }, [token, dispatch]);



    return (
        <div className='currentTrack__container'>
            {
                currentlyPlaying && (
                    <div className="track">
                        <div className="track__image">
                            <img src={currentlyPlaying.image} alt="CurrentlyPlaying" />
                        </div>
                        <div className="track__info">
                            <h4 className='track__info__track__name'>
                                {currentlyPlaying.name}
                            </h4>
                            <h6 className='track__info__track__artists'>
                                {currentlyPlaying.artists.join(", ")}
                            </h6>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CurrentTrack
