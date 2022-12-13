import React, { useState } from 'react';
import styles from '../../styles/components/portfolio/Uploads.module.scss';

function Upload_Resume(props) {
    const [loader, set_loader] = useState(false);

    const upload_handler = async (e) => {
        const file = e.target.files[0];
        await props.file(file);
    };

    
    return (
        <div className={styles.resume}>
            <small>{loader ? "Loading" : "Upload Resume"}</small>
            <input className={styles.resume__input} name="doc" type="file" accept=".doc, .docx, .pdf, .rtf" onChange={(e) => upload_handler(e)} />    
        </div>
    )
};

export default Upload_Resume;
