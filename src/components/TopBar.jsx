import React, { useState } from 'react';
import CompanyLogo from '../images/LogoBurla.jpeg';
import ProfileImage from '../images/profile-avatar.jpeg';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';

const TopBar = (props) => {
    const { colors, setAppColour } = props;
    const [showDropDown, setShowDropDown] = useState(false);
    const navigate = useNavigate();

    const dropDownItems = [
        {
            dropDownName: 'Edit Profile',
            dropDownIcon: TbUserEdit,
            dropDownKey: 'editProfile',
            onClick: () => {
                console.log('Edit Profile clicked');
                // Add Edit Profile navigation or logic
            },
        },
        {
            dropDownName: 'Log out',
            dropDownIcon: IoMdLogOut,
            dropDownKey: 'logOut',
            onClick: () => handleLogOut(),
        },
    ];

    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className={`top-bar ${props.appColour}`}>
            <img src={CompanyLogo} alt="Logo" className="company-logo" />
            <div className="colors-set">
                {colors.map((o) => (
                    <div
                        key={o}
                        className={`each-color-set ${o}`}
                        onClick={() => setAppColour(o)}
                    />
                ))}
            </div>
            <div className="top-drop-down-column">
                <div
                    className={`top-drop-down ${props.appColour}`}
                    onClick={() => setShowDropDown(!showDropDown)}
                >
                    <img src={ProfileImage} alt="Profile" className="profile-image" />
                    <p> Profile </p>
                    <MdOutlineKeyboardArrowDown />
                </div>
                {showDropDown && (
                    <div className={`drop-down ${props.appColour}`}>
                        {dropDownItems.map((o) => {
                            const DropDownIcon = o.dropDownIcon;
                            return (
                                <div
                                    className="each-item"
                                    key={o.dropDownKey} // Correct placement of key
                                    onClick={o.onClick} // Attach onClick to the parent div
                                >
                                    <div className="each-item-icon">
                                        <DropDownIcon />
                                    </div>
                                    <p>{o.dropDownName}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
