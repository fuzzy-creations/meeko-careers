import styles from '../../styles/components/items/Shapes.module.scss';
import { FiFileText } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { ColumnSpaced } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';

function Card_Medium (props) {

    return (
        <div className={styles.card_medium} style={{backgroundColor: props.color ? colors_list[props.color] : "transparent", padding: props.color ? "1rem" : null}}>
            <div className={styles.card_medium__icon}>{props.icon ? props.icon : <IoLocationSharp />}</div>
            <div>
                <small style={{color: props.color ? colors_list.white_light : null}}>{props.name}</small>
                <h4 className={styles.card_medium__bold} style={{color: props.color ? colors_list.white : null}}>{props.children}</h4>
            </div>
        </div>
    )
}

export default Card_Medium;