import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import cl from './Navbar.module.css';
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout  = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__links}>
                <Link className={cl.navbar__link} to="/about">About</Link>
                <Link className={cl.navbar__link} to="/posts">Posts</Link>
            </div>

            <MyButton
                onClick = {logout}
            >
                Log Out
            </MyButton>
        </div>
    );
};

export default Navbar;