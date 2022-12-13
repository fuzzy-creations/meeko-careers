import styles from '../../styles/components/items/Edit_Icon.module.scss';
import { MdEdit, MdClose } from "react-icons/md";
import { useState } from 'react';

function Edit_Icon (props) {
    const value = props.value;

    return (
        <span onClick={() => props.toggle(!value)} className={styles.icon}>{value ? <MdClose /> : <MdEdit />}</span>
    )
}

export default Edit_Icon;