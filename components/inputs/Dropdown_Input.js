import { useState } from 'react';
import styles from '../../styles/components/inputs/Dropdown.module.scss';
import { IoChevronDownSharp, IoCloseSharp } from "react-icons/io5";

function Dropdown_Input (props) {
    const label = props.children;
    const list = props.options;
    const active = props.active;
    const [selected, set_selected] = useState(active ? 0 : false);
    const [show, set_show] = useState(false);

    const drop_handler = () => {
        if(selected !== false && !active) {
            set_selected(false)
        } else {
            set_show(!show)
        }
    };

    const action_handler = (index) => {
        set_selected(index);
        if(props.action) { props.action(index); }
    }
    

    return (
        <div className={styles.drop} onClick={drop_handler}>
            {selected !== false ? <p className={styles.drop__label}>{label}:</p> : null}
            <p className={styles.drop__option}>{selected !== false ? list[selected] : label}</p>
            {
                show ? (
                    <div className={styles.drop__list}>
                        {list.map((item, index) => <p onClick={() => action_handler(index)} className={styles.drop__item}>{item}</p>)}
                    </div>
                ) : null
            }
            <div className={styles.drop__icon}>{selected !== false && !active ? <IoCloseSharp /> : <IoChevronDownSharp />}</div>
        </div>
    )
}

export default Dropdown_Input;