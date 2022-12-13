import styles from '../../styles/components/inputs/Radio_Input.module.scss';

function Radio_Input (props) {

    const options = props.options;

    return (
    <div className={styles.radio}>
        <label>{props.children}</label>
        <div className={styles.radio__options}>
            {options.map((item, index) => {
                return (
                    <div className={styles.radio__wrapper}>
                        <small>{item}</small>
                        <input className={styles.radio__input} type="radio" name={props.children} value={index} onClick={(e) => props.input(index)} />
                        <div className={styles.check}><div className={styles.check__inside}></div></div>
                    </div>
                )
            })}
        </div>
    </div>


    )
};

export default Radio_Input;