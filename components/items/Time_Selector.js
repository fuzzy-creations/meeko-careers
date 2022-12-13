import React from 'react';
import styles from '../../styles/components/items/Time_Selector.module.scss';



function Time_Selector(props){
    return (
    <div onClick={() => props.action()} className={`${styles.container} ${props.selected ? styles.selected : null}`}>
        <h4 class="medium">{props.data}</h4>
    </div>
    )
}

export default Time_Selector;