import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'


import Body from './Body/Body'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'
import SideBar from './SideBar/SideBar'


import { useStateProvider } from '../../utils/StateProvider'


import './Spotify.scss'
import { reducerCases } from '../../utils/Constants'



const Spotify = () => {

    // hooks and State Creation
    const [navBackground, setNavBackground] = useState(false)
    const [headerBackground, setHeaderBackground] = useState(false)
    const bodyRef = useRef();

    // useState Provider
    const [{ token }, dispatch] = useStateProvider();

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ?
            setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ?
            setHeaderBackground(true) : setHeaderBackground(false);
    }



    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/me",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            // console.log({ data });

            const userInfo = {
                userId: data.id,
                userUrl: data.external_urls.spotify,
                username: data.display_name,
            }
            // console.log(userInfo);
            dispatch({ type: reducerCases.SET_USER, userInfo });
        }
        getUserInfo();
    }, [dispatch, token])


    useEffect(() => {
        const getPlaybackState = async () => {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/me/player",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: data.is_playing });
        };

        getPlaybackState();
    }, [dispatch, token]);



    return (
        <div className='spotify__container'>
            <div className="spotify__body">
                <SideBar />
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <NavBar navBackground={navBackground} />
                    <div className="body__content">
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>

            <div className="spotify_footer">
                <Footer />
            </div>
        </div>
    )
}

export default Spotify
