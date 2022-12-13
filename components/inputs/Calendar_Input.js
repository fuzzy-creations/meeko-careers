import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/inputs/Inputs.module.scss';
import Calendar from '../items/Calendar';
import moment from 'moment';

function Calendar_Input (props) {
    const [open, set_open] = useState(false);

    
    const select_handler = (date) => {
        set_open(false);
        props.input(date.format('DD MMMM YYYY'))
    };

    return open ? (
        <div className={styles.calendar__wrapper}>
            <Calendar now={true} rules={false} set_date_selected={select_handler} />  
        </div>
        ) : (
        <div className={styles.calendar} onClick={() => set_open(true)}>
            <p className={styles.calendar__input}>{props.value}</p>
            <label>{props.children}</label>
        </div>
    )
}

export default Calendar_Input;