import React, { useEffect } from 'react'

import axios from 'axios'

import { AiFillClockCircle } from "react-icons/ai"


import { useStateProvider } from '../../../utils/StateProvider'
import { reducerCases } from '../../../utils/Constants'

// import styled from 'styled-components'
import './Body.scss'



const Body = ({ headerBackground }) => {

    // useState Provider for date fetching
    const [{ token, selectedPlaylist_ID, selectedPlaylist }, dispatch] = useStateProvider();

    useEffect(() => {
        const getInitialPlayList = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${selectedPlaylist_ID}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }
                },
            );
            console.log(response);
            // console.log(response.data);

            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a") ? "" : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    durations: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                }))
            }
            console.log(selectedPlaylist);
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
        }

        getInitialPlayList();
    }, [token, dispatch, selectedPlaylist_ID])




    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                context_uri,
                offset: {
                    position: track_number - 1,
                },
                position_ms: 0,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        )

        if (response.status === 204) {
            const currentlyPlaying = { id, name, artists, image };
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
        } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
        }
    }





    // TimeConverter
    const msToMinutesAndSeconds = (milisec) => {
        const minutes = Math.floor(milisec / 60000);
        const seconds = ((milisec % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }






    return (
        <div className='body__container'>
            {
                selectedPlaylist &&
                (
                    <>
                        <div className="playlist">
                            <div className="image">
                                <img src={selectedPlaylist.image} alt="Selectedplaylist" />
                            </div>
                            <div className="details">
                                <span className='type'>PlayLists</span>
                                <h1 className='title'>{selectedPlaylist.name}</h1>
                                <p className="description">{selectedPlaylist.description}</p>
                            </div>
                        </div>
                        <div className="list">
                            <div className="header__row" style={{backgroundColor: ({headerBackground}?"#000000dc":"none")}}>
                                <span>#</span>
                                <div className="col">
                                    <span>TITLE</span>
                                </div>
                                <div className="col">
                                    <span>ALBUM</span>
                                </div>
                                <div className="col">
                                    <span><AiFillClockCircle /></span>
                                </div>
                            </div>

                            <hr />

                            <div className="tracks">
                                {
                                    selectedPlaylist.tracks.map(({ id, name, artists, image, durations, album, context_uri, track_number }, index) => {
                                        return (
                                            <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                                                <div className="col">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="col details">
                                                    <div className="image">
                                                        <img src={image} alt="track" />
                                                    </div>
                                                    <div className="info">
                                                        <span className="name">{name}</span>
                                                        <span>{artists.join(", ")}</span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <span>{album}</span>
                                                </div>
                                                <div className="col duration">
                                                    <span>{msToMinutesAndSeconds(durations)}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Body