import styles from '../../styles/components/items/Shapes.module.scss';
import { FiFileText } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { ColumnSpaced } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';
import Background_Shape from '../UI/Background_Shape';

function Card_Small (props) {

    const colors = ["shape_purple", "shape_pink", "shape_blue", "shape_green"]

    return (
        
        <div className={styles.card_small} style={{backgroundColor: props.color ? colors_list[props.color] : "transparent", padding: props.color ? "1rem" : null}}>
            <div className={`${colors[props.icon]} ${styles.card_small__icon}`}></div>
            <div>
                <small style={{color: props.color ? colors_list.white_light : null}}>{props.name}</small>
                <p className={styles.card_small__bold} style={{color: props.color ? colors_list.white : null}}>{props.children}</p>
            </div>
        </div>
    )
}

export default Card_Small;