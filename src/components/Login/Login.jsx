import React from 'react'

// import styled from 'styled-components'

import logo from "../../assets/spotify_black.png"

import './Login.scss'

const Login = () => {

    const HandleClick = () => {
        console.log("Clicked");
        // const clientId = "f4ad14d4e61a454fb649efaa36df5f05";
        const clientId = "bb976045cff74c3b89c5ed9dad2dddf2";
        const redirect_URL = "http://localhost:5173/"
        const API_URL = "https://accounts.spotify.com/authorize"
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played",
        ];

        window.location.href = `${API_URL}?client_id=${clientId}&redirect_uri=${redirect_URL}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`
    }


    return (
        <div className='container'>
            <img src={logo} alt="spotify" />
            <button onClick={HandleClick}>Connect To Spotify</button>
        </div>
    )
}



// Styled-components
// const Container = styled.div``;

export default Login
