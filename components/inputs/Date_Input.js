import styles from '../../styles/components/inputs/Inputs.module.scss';

function Date_Input (props) {

    return (
        <div className={styles.date}>
            <div className={styles.date__wrapper}>
                <input placeholder="Years" className={styles.date__input} type="number" value={props.years_value} onChange={(e) => props.years_input(e.target.value)} />
                <input placeholder="Months" className={styles.date__input} type="number" value={props.months_value} onChange={(e) => props.months_input(e.target.value)} />
            </div>
            <label>{props.children}</label>
        </div>
        
    )
}

export default Date_Input;