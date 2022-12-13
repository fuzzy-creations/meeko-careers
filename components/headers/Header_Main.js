

import React from 'react';
import styles from '../../styles/components/headers/Header.module.scss';


function Header_Main (props) {

    return (
        <section className={styles.main}>
            <h2>{props.children}</h2>
            <h4 className={styles.main__sub}>{props.amount} Results</h4>
        </section>
        );
}

export default Header_Main;