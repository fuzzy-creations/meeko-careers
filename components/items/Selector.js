import { Link } from 'react-router-dom';
import styles from '../../styles/components/items/Selector.module.scss';


function Selector (props) {
    const data = props.data;
    return (
        <div onClick={() => props.select(data)} className={styles.item}>
             <div className={`shape_pink ${styles.item__box}`}></div>
             <h4 className={styles.item__text}>{data.name}</h4>
         </div>
    )
};

export default Selector