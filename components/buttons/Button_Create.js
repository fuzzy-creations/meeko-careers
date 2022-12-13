import { IoIosAdd } from "react-icons/io";
import styles from '../../styles/components/buttons.module.scss';


function Button_Create (props) {

    return (
        <div className={styles.create}>
            <IoIosAdd /> 
            <h4 className={styles.create__text}>{props.children}</h4>
        </div>)
}

export default Button_Create;