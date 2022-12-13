import React, { useState } from 'react';
import styles from '../../styles/components/UI/Modal.module.scss';

function Click_Modal(props){
    const content = props.content;
    const [open_task, set_open_task] = useState(content ? false : true);

    const classname = props.embedded ? "trans-modal" : "modal";

    const close_modal = (e) => {
        if(e.target.className == classname) {
            document.body.style.overflow = 'unset';
            set_open_task(false);
        };
    };

    return (
        <>
        {content ? <div style={{display: "flex", height: props.height}} onClick={() => set_open_task(true)}>{props.content}</div> : null} 
        {open_task ? ( 
            <main className={classname} onClick={close_modal}>
                {props.custom ? (
                        React.cloneElement(props.children, { close: () => set_open_task(false) })
                ) : (
                    <section className={styles.modal} style={{height: `${props.height}%`, width: `${props.width}%`}}>
                        <section className={styles.content}>
                            {React.cloneElement(props.children, { close: () => set_open_task(false) })}
                        </section>
                    </section>
                )}
            </main> 
        ) : null}
        </>
    )


}


export default Click_Modal;