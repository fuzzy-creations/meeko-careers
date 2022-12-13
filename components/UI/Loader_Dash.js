import { useState, useEffect } from 'react';
import Nav from './Nav';
import styles from '../../styles/components/UI/Loader_Page.module.scss';
import Item_Loader from './Item_Loader';

function Loader_Dash () {
    const [display, set_display] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            set_display(true);
        }, 2000)
    }, [])

    return (
        <>
            <main className={styles.dash}>
                <Nav />
                <section className={styles.dash_loader}>
                    <div className={styles.logo}></div>
                    {display ? <div className={styles.item}><Item_Loader /></div> : <div className={styles.item}></div>}
                </section>
            </main>
        </>
    )
};

export default Loader_Dash;