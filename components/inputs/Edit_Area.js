import { useState } from "react";
import styles from '../../styles/components/portfolio/Portfolio_Entry.module.scss';
import Button_Main from "../buttons/Button_Main";

function Edit_Area (props) {
    const [summary, set_summary] = useState(props.value);

    const add_handler = () => {
        props.object === false ? props.input(summary) : props.input({...props.object, [props.entry]: summary });
        props.object === false ? props.save(summary) : props.save(props.entry, summary);
        props.close(false);
    };

    return (
        <>
            <textarea className={styles.summary} value={summary} onChange={(e) => set_summary(e.target.value)} />
            <div className={styles.action}><Button_Main action={add_handler}>Save</Button_Main></div>
        </>
    )
}

export default Edit_Area;