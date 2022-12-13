import styles from '../../styles/components/UI/Notifications.module.scss';
import logo from '../../assets/meeko-favicon.png';
import { Column } from '../../tools/global_components';


function Notifications () {

    const image = <img src={logo} />

    const item = (
        <div className={styles.item}>
            <div className={styles.item__avatar}>
                {image}
                {/* <div className={styles.item__dot}></div> */}
            </div>
            <div className={styles.item__content}>
                <p>Lorem ipsum dolor sit amet</p>
                <small>04 June 2022 | 4:00 PM</small>
            </div>
        </div>
    )

    return ( 
            <section className={styles.main}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(note => item)}
            </section>
    )

};

export default Notifications;