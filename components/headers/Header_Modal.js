import React, { useContext } from 'react';
import styles from '../../styles/components/headers/Header.module.scss';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Header_Modal (props) {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();


    return (
        <section className={styles.modal}>
            {props.avatar ? <img src={props.avatar} /> : null}
            <div>
                {props.name ? <h3 class="medium">{props.name}</h3> : null}
                <h2>{props.children}</h2> 
            </div>
        </section>
    );
}

export default Header_Modal;