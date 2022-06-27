import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button onClick={openMenu} id="nav-bar-profile-button">
                <i class="fa-solid fa-bars fa-xl" id='nav-bar-profile-menu-icon'></i>
                <svg id='nav-bar-profile-icon' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm0,18.3a8.28,8.28,0,0,1-6.49-3.14,8.12,8.12,0,0,1,4.21-2.88,4.25,4.25,0,1,1,4.56,0,8.12,8.12,0,0,1,4.21,2.88A8.28,8.28,0,0,1,10,18.3Z"/>
                </svg>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
