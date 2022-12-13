import styles from '../../styles/pages/Rota.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import { get_now_seconds } from '../../tools/DateTime_Methods';
import moment from 'moment';
import { IoCloseCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import generatePushID from '../../tools/IDGenerator';
import { ManageContext } from '../../contexts/Manage.context';
import { Row, RowSpaced } from '../../tools/global_components';
import Click_Modal from '../../components/items/Click_Modal';
import { ProfileContext } from '../../contexts/Profile.context';
import { AuthContext } from '../../contexts/Auth.context';
import { add_rota, remove_rota } from '../../firebase/methods/Rota_Functions';
import { listenRealTimeRota } from '../../firebase/fetches/Dashboard';
import { job_remote } from '../../tools/global_variables';
import Header_Modal from '../../components/headers/Header_Modal';
import Button_Add from '../../components/buttons/Button_Add';


function Rota (props) {
    const { profile } = useContext(ProfileContext);
    const { user } = useContext(AuthContext);
    const [rota, set_rota] = useState([]);
    const [value, set_value] = useState(0);
    const [days, set_days] = useState([false, true, true, true, true, true, false])
    const [calendar, set_calendar] = useState([]);

    const available = [5, 2, 0, 0];

    const now = moment();

    useEffect(() => {
        const fetch_data = async () => {
            const unlistenRota = listenRealTimeRota(set_rota, profile.company_id);
        };
        fetch_data()
    }, []);


    useEffect(() => {
        set_calendar(new Array(4).fill().map((item, index) => generate_week(index)))
    }, [rota]);

    const generate_week = (v) => {
        const items = [];
        new Array(7).fill().forEach((item, index) => {
            const time = moment().add(v, 'weeks').startOf('week').add(index, 'days');
            const format = time.format('X');
            const confirmed = rota.filter(obj => obj.date === format);
            items.push({
                time: time, 
                open: days[index],
                going: confirmed,
                selected: confirmed.find(item => item.user_id === user) ? confirmed.find(item => item.user_id === user).id : false,
                invalid: time.isBefore(now, 'day'),
                current: time.isSame(now, 'day'),
            });
        });
        return items.filter(item => item.open);
    };

    const add_handler = (time) => {
        const cid = profile.company_id;
        const seconds = time.format('X');
        const id = generatePushID();
        add_rota(id, user, cid, seconds);

        /// fixed day else day = null
    };

    const remove_handler = (id) => {
        remove_rota(id)
    }


    const load_last_week_handler = () => {
        // pls fix
        set_value(value - 1);
        const loaded = generate_week(value - 1);
        calendar.unshift(loaded);
    }

    return (
        <main className={styles.rota}>
            <Header_Modal>Lorem ipsum dolor</Header_Modal>
            <section className={styles.top}>
                <h4 class="medium">{job_remote[profile.position.type]}</h4>
                <Button_Add action={load_last_week_handler}>View Last Week</Button_Add>
            </section>
            <section className={styles.calendar}>
                {calendar.map(week => {
                    const amount = available[profile.position.type] - week.filter(i => i.selected).length;
                    return (
                        <>
                        <div className={styles.header}>
                            <h4>{week[0].time.format('D MMMM')} - {week[week.length - 1].time.format('D MMMM')}</h4>
                            <small>You can attend the office {amount} more times this week.</small>
                        </div>
                        
                        <section className={styles.week}>
                            {week.map(day => {
                                                        
                                const plus = <div className={`${styles.day__icon} ${styles.day__icon__add}`}><IoAddCircleOutline /></div>
                                const remove = <><div className={`${styles.day__icon} ${styles.day__icon__close}`}><IoMdCheckmarkCircleOutline /></div><span className={`${styles.day__icon} ${styles.day__icon__close__alt}`}><IoCloseCircleOutline /></span></> ; 
                                const icon = day.invalid ? null : (day.selected ? remove : (amount === 0 ? null : plus))
                                
                                const action = () => {
                                    if(day.invalid || amount === 0) return
                                    if(day.selected) { 
                                        remove_handler(day.selected) 
                                    } else { 
                                        add_handler(day.time) 
                                    }
                                }

                                const style_handler = () => {
                                    if(day.invalid) return styles.day__invalid
                                    if(day.selected) return styles.day__selected
                                    if(amount === 0) return styles.day__full;
                                    return styles.day__default;
                                }

                                return (
                                    <div onClick={action} className={`${styles.day} ${style_handler()}`}>
                                        <RowSpaced>
                                            <h4 className={day.current ? styles.day__now : null}>{day.time.format('dddd')}</h4>
                                            {icon}
                                        </RowSpaced>
                                        <div className={styles.day__list}>
                                            {day.going.map(item => <small className={`${styles.day__user} ${item.user_data.id === user ? styles.day__user__current : null}`}>{item.user_data.name}</small>)}
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                        </>
                    )    
                })}`
            </section>
        
        </main>
    )
}

export default Rota;


