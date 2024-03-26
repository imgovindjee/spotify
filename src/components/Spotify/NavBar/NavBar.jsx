import React from 'react'

import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { useStateProvider } from '../../../utils/StateProvider';


import './NavBar.scss'



const NavBar = ({ navBackground }) => {

    const [{ userInfo }] = useStateProvider();

    return (
        <div className='navbar__container' style={{ backgroundColor: ({ navBackground } ? "rgba(0, 0, 0, .7)" : "none" )}}>
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder='Artists, Songs or PodCasts' />
            </div>

            <div className="avatar">
                <a href="#">
                    <CgProfile />
                    <span>
                        {
                            userInfo?.username
                        }
                    </span>
                </a>
            </div>
        </div>
    )
}

export default NavBar
