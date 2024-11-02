import React from 'react';
import CompanyLogo from '../images/LogoBurla.jpeg';
import ProfileImage from '../images/profile-avatar.jpeg';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const TopBar = (props) => {

    return (
        <div className={`top-bar ${props.appColour}`}>
            <img src={CompanyLogo} alt="Logo" className="company-logo"/>
            <div className={`top-drop-down ${props.appColour}`}>
                <img src={ProfileImage} alt="Profile" className="profile-image"/>
                <p> Profile </p>
                <MdOutlineKeyboardArrowDown />
            </div>
        </div>
    )
}

export default TopBar;