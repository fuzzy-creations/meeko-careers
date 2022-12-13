import React from 'react';
import styles from '../../styles/components/items/Date_Selector.module.scss';



function Date_Selector(props){

    return (
    <div onClick={() => props.action()} className={`${styles.container} ${props.selected ? styles.selected : null}`}>
        <p class="medium">{props.data.day.slice(0, 3)}</p>
        <h4 class="medium">{props.data.date}</h4>
    </div>
    )
}

export default Date_Selector;