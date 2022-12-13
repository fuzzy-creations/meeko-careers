import React from 'react';
import { FaCamera } from "react-icons/fa";
import styles from '../../styles/components/portfolio/Uploads.module.scss';

function Upload_Image(props) {

    const upload_handler = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        props.file(file);
        props.preview(preview);
    }
    
    return (
        <div className={styles.container} style={{"backgroundImage": `url(${props.value})`}}>
            <input className={styles.input} name="image" type="file" accept="image/*" onChange={(e) => upload_handler(e)} />     
            <FaCamera />
        </div>
    )
}

export default Upload_Image;