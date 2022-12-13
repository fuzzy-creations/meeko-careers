import styles from '../../styles/components/inputs/Inputs.module.scss';

function Edit_Input (props) {

    return props.save ? <input className={styles.edit_input} placeholder={props.placeholder} value={props.value} onBlur={props.save} onChange={(e) => props.input(e.target.value)} /> : <input className={styles.edit_input} placeholder={props.placeholder} value={props.value[props.name]} onChange={(e) => props.input({...props.value, [props.name]: e.target.value})} />
}

export default Edit_Input;