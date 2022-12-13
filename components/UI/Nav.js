import styles from '../../styles/components/UI/Nav.module.scss';
import {  useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { NotificationContext } from '../../contexts/Notification.context';
import { AuthContext } from '../../contexts/Auth.context';


function Nav () {
    const { display_notes, set_display_notes } = useContext(NotificationContext);
    const { user_data } = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory()
    console.log(history)
    console.log(location)

    // const params = props.match.params.type;
    return ( 
        <div className={styles.navigation}>
            <Link to="/" className={styles.navigation__logo}></Link>
            <h4 className={styles.navigation__title}>{location.pathname.split("/")[2] || "Dashboard"}</h4>
            <div className={styles.navigation__menu}>
                <Link to="/" className={`${styles.navigation__menu__item}`}>Home</Link>
                <Link to="/jobs" className={`${styles.navigation__menu__item}`}>Find Jobs</Link>
                <Link to="/portfolio" className={`${styles.navigation__menu__item}`}>Portfolio</Link>
                <Link to="/dashboard" className={`${styles.navigation__menu__item} ${location.pathname.split("/")[1] === "dashboard" ? styles.navigation__menu__item__active : null}`}>Dashboard</Link>
                {user_data && user_data.admin ? <Link to="/manage" className={`${styles.navigation__menu__item} ${location.pathname.split("/")[1] === "manage" ? styles.navigation__menu__item__active : null}`}>Manage</Link> : null}
            </div>
            <div onClick={() => set_display_notes(!display_notes)} className={styles.navigation__notes}>{display_notes ? <IoCloseCircleOutline /> : <IoMdNotificationsOutline />}</div>
        </div>
    )
}

export default Nav;