import React, { useContext, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styles from '../../styles/components/UI/Navigation.module.scss';

import Register from "../forms/Register";
import Login from "../forms/Login";
import { AuthContext } from "../../contexts/Auth.context";

function Navigation (props) {
    const { user, user_data, login_open, set_login_open, register_open, set_register_open } = useContext(AuthContext);
    
    const url = props.location.pathname;


    if(url.includes("dashboard") || url.includes("manage")) return null

    const open_handler = (num) => {
        document.body.style.overflow = "hidden";
        if(num === 0) { set_login_open(true); return }
        if(num === 1) { set_register_open(true); return }
    };

    const switch_handler = (num) => {
        document.body.style.overflow = "hidden";
        if(num === 0) { set_register_open(false); set_login_open(true); return }
        if(num === 1) { set_login_open(false); set_register_open(true); return }
    };

    




    return (
        <>
        <div className={styles.navigation}>
            <div className={url === "/dashboard" || url === "/manage" ? null : styles.navigation__logo}></div>
            <div className={styles.navigation__menu}>
                <Link to="/" className={`${styles.navigation__menu__item} ${url === "/" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Home</Link>
                <Link to="/jobs" className={`${styles.navigation__menu__item} ${url === "/jobs" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Find Jobs</Link>
                {user && user_data ? (
                     <>
                     <Link to="/portfolio" className={`${styles.navigation__menu__item} ${url === "/portfolio" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Portfolio</Link>
                     <Link to="/dashboard" className={`${styles.navigation__menu__item} ${url === "/dashboard" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Dashboard</Link>
                     {user_data.admin ? <Link to="/manage" className={`${styles.navigation__menu__item} ${url === "/manage" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Manage</Link> : null}
                     </>
                ) : (
                    <>
                    <h4 onClick={() => open_handler(0)} className={`${styles.navigation__menu__item} ${login_open ? styles.navigation__menu__item__active : null}`}>Login</h4>
                    <h4 onClick={() => open_handler(1)} className={`${styles.navigation__menu__item} ${register_open ? styles.navigation__menu__item__active : null}`}>Register</h4>
                    </>                 
                )}
            </div>
        </div>
        {register_open ? <Register close={() => set_register_open(false)} switch={() => switch_handler(0)} /> : null}
        {login_open ? <Login close={() => set_login_open(false)} switch={() => switch_handler(1)} /> : null}
        </>
    );
};

export default withRouter(Navigation);