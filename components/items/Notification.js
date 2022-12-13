import styles from '../../styles/components/items/Notification.module.scss';
import { FaWpforms } from "react-icons/fa";

function Notification () {
    return (
        <div className={styles.notification}>
            <div className={styles.image}><FaWpforms /></div>
            <div className={styles.content}>
                <small>Application sent</small>
                <p>Software Developer</p>
                <small>5 minutes ago</small>
            </div>
            <div className={styles.action}>

            </div>
        </div>
    )
}

export default Notification;