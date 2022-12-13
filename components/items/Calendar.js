import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import moment from 'moment';
import styles from '../../styles/components/items/Calendar.module.scss';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Calendar = forwardRef((props, ref) => {

    const available = props.available;
    const schedule = props.schedule;
    const [rules, set_rules] = useState(props.rules || false);
    const [value, set_value] = useState(0);
    const [calendar, set_calendar] = useState([]);
    const [weekdiff, set_weekdiff] = useState(0);
    const [selected, set_selected] = useState([]);

    const now = moment().subtract(1, 'days');
    const start = moment().add(value, 'months').startOf('month');
    const start_week = start.clone().startOf('week');
    const end = moment().add(value, 'months').endOf('month');
    const diff = end.diff(start, 'days') + 1;


    useEffect(() => {
        set_selected([]);
        const items = [];
        new Array(diff).fill().forEach((item, index) => {
            items.push(moment().add(value, 'months').startOf('month').add(index, 'days'))
        })
        set_weekdiff(items[0].diff(start_week, 'days'))
        set_calendar(items)

    }, [value])

    useImperativeHandle(ref, () => ({
        get_dates() { return selected.map(index => calendar[index]); }
    }));

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    const selected_handler = (index) => {
        if(props.now) { props.set_date_selected(calendar[index]); }
        if(rules) { 
            if(selected.includes(index)) {
                set_selected(selected.filter(item => item !== index))
            } else {
                set_selected([...selected, index]) 
            }
        } else { 
            set_selected([index]) 
        }
        if(available) {
            props.set_date_selected(calendar[index])
        }
    }


    return (
        <main>
            <section className={styles.operator}>
                <h5 class="bold">{start.format('MMMM YYYY')}</h5>
                <div>
                    <span className={schedule && value < 1 ? styles.operator__invalid : null} onClick={schedule && value < 1 ? null : () => set_value(value - 1)}><FaChevronLeft /></span>
                    <span onClick={() => set_value(value + 1)}><FaChevronRight /></span>
                </div>
            </section>
            <section className={styles.calendar}>
                {weekdays.map((day, index) => <div className={styles.weekday}><p class="bold medium">{weekdays[index]}</p></div>)}
                {new Array(weekdiff).fill().map(item => <div></div>)}
                {calendar.map((day, index) => {
                    const chosen = available ? available.map(date => moment.unix(date).format('YYYY-MM-DD')).includes(day.format('YYYY-MM-DD')) : null;
                    const invalid = available ? (!chosen || day.isBefore(now) && schedule ? true : false) : day.isBefore(now) && schedule ? true : false;
                    return (
                        <div onClick={invalid ? null : () => selected_handler(index)} className={`${styles.day} ${invalid ? styles.invalid : null} ${chosen ? styles.available : null} ${selected.includes(index) ? styles.selected : null}`}>
                            <p>{day.format('D')}</p>
                        </div>
                    )
                }
                )}
            </section>
        </main>
    )

})

export default Calendar;