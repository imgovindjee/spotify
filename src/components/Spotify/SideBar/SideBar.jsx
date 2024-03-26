import React from 'react'

import { IoLibrary } from "react-icons/io5";
import {
    MdHomeFilled,
    MdSearch
} from "react-icons/md";


import PlayLists from '../PlayLists/PlayLists';


// import logo from '../../../assets/spotify_white.png'
import logo from '../../../assets/spotify_green.png'


import './SideBar.scss'



const SideBar = () => {
    return (
        <div className='sidebar__container'>
            <div className="top__links">
                <div className="logo">
                    <img src={logo} alt="spotify" />
                </div>
                <ul>
                    <li>
                        <MdHomeFilled />
                        <span>Home</span>
                    </li>
                    <li>
                        <MdSearch />
                        <span>Search</span>
                    </li>
                    <li>
                        <IoLibrary />
                        <span>Your Library</span>
                    </li>
                </ul>
            </div>

            <PlayLists />
        </div>
    )
}

export default SideBar
