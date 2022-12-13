import React from 'react';
import styles from '../../styles/components/buttons.module.scss';
import Item_Loader from '../UI/Item_Loader';

function Button_Outline(props){
    
    const action_handler = () => {
        if(props.loader) return
        if(props.action) return props.action();
        return
    }
    return (
        <button className={`${styles.outline} ${props.white ? styles.outline__white : null} ${props.active === false || props.active ===  null ? styles.outline__inactive : null} ${props.shadow ? styles.outline__shadow : null}, ${props.full ? styles.outline__full : null}`} style={{width: props.width ? `${props.width}rem` : "20rem", height: props.height ? `${props.height}rem` : "3.5rem" }} onClick={() => action_handler()} >
            {props.loader ? <Item_Loader /> : props.children}
        </button>
    )
}


export default Button_Outline;