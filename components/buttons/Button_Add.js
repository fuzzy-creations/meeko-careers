import { IoIosAdd } from "react-icons/io";
import styles from '../../styles/components/buttons.module.scss';


function Button_Add (props) {

    const action_handler = () => {
        if(props.loader) return
        if(props.action) return props.action();
        return
    }

    return (
    <div  onClick={() => action_handler()} className={styles.add}>
        <p className={styles.add__text}>{props.children}</p>
        <IoIosAdd/>
    </div>
    )
}

export default Button_Add