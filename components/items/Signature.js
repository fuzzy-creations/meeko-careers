import React, { useState } from 'react'
import SignaturePad from 'react-signature-canvas';
import styles from '../../styles/components/items/Signature.module.scss';


function Signature (props) {

    const [trimmedDataURL, set_trimmedDataUL] = useState(null);
    const [sigPad, set_sigPad] = useState({});

    const clear = () => set_sigPad(sigPad.clear());
    const trim = () => set_trimmedDataUL(sigPad.getTrimmedCanvas().toDataURL('image/png'));

    console.log(trimmedDataURL)

    return (
        <div className={styles.container}>
             {trimmedDataURL ? (
                 <>
                 <img className={styles.sigImage} src={trimmedDataURL} />
                 <button className={styles.buttons} onClick={() => set_trimmedDataUL(null)}>Clear</button>
                 </>
             ) : (
                 <>
                <div className={styles.sigContainer}>
                    <SignaturePad canvasProps={{className: styles.sigPad}} ref={(ref) => {set_sigPad(ref) }} />
                </div>
                <button className={styles.buttons} onClick={clear}>Clear</button>
                <button className={styles.buttons} onClick={trim}>Save</button>
                </>
             )}
            <div>
            </div>
        </div>
    )
};

export default Signature


