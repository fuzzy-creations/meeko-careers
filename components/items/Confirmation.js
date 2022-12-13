import React, { useState } from 'react';
import Item_Loader from '../UI/Item_Loader';
import Modal from '../UI/Modal';
import Button_Main from '../Button_Main';
import { IoAddOutline } from "react-icons/io5";
import styles from '../../styles/components/items/Confirmation.module.scss';

function Confirmation(props){
    const [open_task, set_open_task] = useState(false);
    const action = props.action;

    const content = (
        <main className={styles.main}>
            <div></div>
            <h4>{props.children}</h4>
            <p>Are you sure?</p>
            <div className={styles.actions}>
                <Button_Main action={{}}>Confirm</Button_Main>
                <Button_Main action={() => set_open_task(false)}>Cancel</Button_Main>
            </div>
        </main>
    )


    return (
        < >
        <div onClick={() => set_open_task(true)}>{props.children}</div>
        {open_task ? <Modal close={() => set_open_task(false)}>{content}</Modal> : null}
        </>
    )
}


export default Confirmation;
