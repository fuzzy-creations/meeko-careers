import { useState, useEffect } from 'react';
import styles from '../../styles/components/UI/Loader_Page.module.scss';
import Item_Loader from './Item_Loader';

function Loader_Page () {
    const [display, set_display] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            set_display(true);
        }, 2000)
    }, [])

    return (
        <main className={styles.loader}>
            <div className={styles.logo}></div>
            {display ? <div className={styles.item}><Item_Loader /></div> : <div className={styles.item}></div>}
        </main>
    )
};

export default Loader_Page;