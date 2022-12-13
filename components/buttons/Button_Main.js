import React from 'react';
import styles from '../../styles/components/buttons.module.scss';
import Item_Loader from '../UI/Item_Loader';

function Button_Main(props){
    
    const action_handler = () => {
        if(props.loader) return
        if(props.action) return props.action();
        return
    }
    return (
        <button className={`${styles.button} ${props.hollow ? styles.button__hollow : null} ${props.active === false || props.active ===  null ? styles.button__inactive : null}`} style={props.width ? {width: `${props.width}rem`} : null} onClick={() => action_handler()} >
            {props.loader ? <Item_Loader /> : props.children}
        </button>
    )
}


export default Button_Main;