import React, { useState } from 'react';
import { update_company } from '../../firebase/methods/Company_Functions';
import styles from '../../styles/components/inputs/Toggle.module.scss';
import Modal from '../UI/Modal';

function Toggle (props) {
    const [selected, set_selected] = useState(props.value);
    const [modal, set_modal] = useState(false);


    const select_handler = (value) => {
        update_company(props.id, props.name, value);
        set_selected(!selected)
    };

    return (
        <div className={styles.toggle}>
            <div className={styles.toggle__wrapper} onClick={() => set_modal(true)}>
                <h5 className={styles.name}>{props.name}</h5>
            </div>
            <div className={styles.toggle__wrapper}>
                <input defaultChecked={selected} onChange={() => select_handler(!selected)} className={styles.input} type="checkbox" name={props.name} id={props.name} />
                <label for={props.name}></label>  
            </div>
            {modal ? <Modal close={() => set_modal(false)}>{props.children}</Modal> : null}
        </div>
    );
};

export default Toggle;