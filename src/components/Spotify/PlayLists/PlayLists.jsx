import React, { useEffect } from 'react'

import axios from 'axios';

import { useStateProvider } from '../../../utils/StateProvider';
import { reducerCases } from '../../../utils/Constants';

import './PlayLists.scss'



const PlayLists = () => {

    // getting the playlist form the "stateProvider"
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlayList_Data = async () => {
            //fetching the response we form the user Account
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }
                }
            );
            // console.log(response); //logging out the user response

            // Extracting only the item form the user response
            const { items } = response.data;
            // console.log(items); // logging out the user items

            // saving the playlist form the user-items
            const playlists = items.map(({ name, id }) => {
                return {
                    name, id
                }
            })
            console.log(playlists); // logging the user-playlist details

            // dispatching the data
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        }

        getPlayList_Data();
    }, [token, dispatch]);



    const changeCurrentPlaylist = (selectedPlaylist_ID) => {
        dispatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylist_ID})
    }







    return (
        <div className='Playlist__section'>
            <ul>
                {
                    playlists.map(({ name, id }) => {
                        return (
                            <li key={id} onClick={()=> changeCurrentPlaylist(id)}>
                                {name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PlayLists
