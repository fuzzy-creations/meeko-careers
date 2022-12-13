import { useState } from "react";
import styles from '../../styles/components/inputs/Inputs.module.scss';
import Button_Outline from "../buttons/Button_Outline";
import Button_Main from "../buttons/Button_Main";

function Portfolio_Edit_Summary (props) {
    const [summary, set_summary] = useState(props.value.summary);

    const add_handler = () => {
        props.input({...props.value, summary: summary })
        props.save(summary);
        props.close(false);
    };

    return (
        <>
        <div className={styles.text}>
            <textarea className={styles.text__areainput} value={summary} onChange={(e) => set_summary(e.target.value)} />
            <label>{props.children}</label>
        </div>
        <Button_Outline height={4} width={20} shadow={true} action={add_handler}>Save</Button_Outline>
        </>
        
    )
}

export default Portfolio_Edit_Summary;