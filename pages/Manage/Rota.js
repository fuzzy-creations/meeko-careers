import styles from '../../styles/pages/Rota.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { IoCloseCircleOutline, IoAddCircleOutline, IoListCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import generatePushID from '../../tools/IDGenerator';
import { ManageContext } from '../../contexts/Manage.context';
import { Column, Grid, Row, RowSpaced } from '../../tools/global_components';
import Click_Modal from '../../components/items/Click_Modal';
import { AuthContext } from '../../contexts/Auth.context';
import { add_rota, remove_rota } from '../../firebase/methods/Rota_Functions';
import { format_by_company } from '../../tools/global_functions';
import Header_Modal from '../../components/headers/Header_Modal';
import Button_Add from '../../components/buttons/Button_Add';


function Rota (props) {
    const { rota, profile } = useContext(ManageContext);
    const { user } = useContext(AuthContext);
    const [value, set_value] = useState(0);
    const [days, set_days] = useState([false, true, true, true, true, true, false])
    const [calendar, set_calendar] = useState([]);

    const available = [5, 2, 0, 0];

    const now = moment();


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
                <h4 class="medium">Manager</h4>
                <Button_Add action={load_last_week_handler}>View Last Week</Button_Add>
            </section>
            <section className={styles.calendar}>
                {calendar.map(week => {
                    return (
                        <>
                        <div className={styles.header}>
                            <h4>{week[0].time.format('D MMMM')} - {week[week.length - 1].time.format('D MMMM')}</h4>
                            {/* <small>There are.</small> */}
                        </div>
                        
                        <section className={styles.week}>
                            {week.map(day => {
                                                        
                                const plus = <div className={`${styles.day__icon} ${styles.day__icon__add}`}><IoAddCircleOutline /></div>
                                const remove = <><div className={`${styles.day__icon} ${styles.day__icon__close}`}><IoMdCheckmarkCircleOutline /></div><span className={`${styles.day__icon} ${styles.day__icon__close__alt}`}><IoCloseCircleOutline /></span></> ; 
                                const icon = <div className={`${styles.day__icon} ${styles.day__icon__add}`}><IoListCircleOutline /></div>
                                


                                const style_handler = () => {
                                    if(day.invalid) return styles.day__invalid
                                    return styles.day__default;
                                }

                                const m = (
                                    <div className={`${styles.day} ${style_handler()}`}>
                                        <RowSpaced>
                                            <h4 className={day.current ? styles.day__now : null}>{day.time.format('dddd')}</h4>
                                            {icon}
                                        </RowSpaced>
                                        <div className={styles.day__list}>
                                            {day.going.map(item => <small className={`${styles.day__user}`}>{item.user_data.name}</small>)}
                                        </div>
                                    </div>
                                )

                                return <Click_Modal content={m}><Edit_Rota data={day} /></Click_Modal>
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


const Edit_Rota = (props) => {
    const { rota, profile, users, employees, companies } = useContext(ManageContext);
    const data = props.data;

    const add_handler = (user, company) => {
        const seconds = data.time.format('X');
        const id = generatePushID();
        add_rota(id, user, company, seconds);
    };

    const remove_handler = (id) => {
        remove_rota(id)
    }

    console.log(data)


    return (
            <Grid columns={"1.5fr 1fr"} rows={"100%"}>
                <Column gap={2}>
                    <h2>Add / Remove</h2>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet gravida tortor eu malesuada. Nullam aliquet gravida tortor eu malesuada.</small>
                    { profile ? (
                        <Column gap={2}>
                            <h4>Employees</h4>
                            <Row gap={1}>
                                {employees.filter(obj => !data.going.find(list => list.user_id === obj.user_id) ).map(item => {
                                    const user_data = users.find(user => user.id === item.user_id);
                                    const company = companies.find(company => company.id === item.company_id)
                                    return (
                                        <div onClick={() => add_handler(user_data.id, company.id)} className={styles.user}>
                                            <img src={user_data.avatar} />
                                            <small>{user_data.name}</small>
                                        </div>
                                    )
                                })}
                            </Row>
                        </Column>
                    ) : (
                        <Column gap={3}>
                            {format_by_company(employees.filter(obj => !data.going.find(list => list.user_id === obj.user_id) )).map(item => {
                                const company = companies.find(company => company.id === item.company)
                                return (
                                    <Column gap={2}>
                                        <h4>{company.name}</h4>
                                        <Row gap={1}>
                                            {item.list.map(item => {
                                                const user_data = users.find(user => user.id === item.user_id);
                                                return (
                                                    <div onClick={() => add_handler(user_data.id, company.id)} className={styles.user}>
                                                        <img src={user_data.avatar} />
                                                        <small>{user_data.name}</small>
                                                    </div>
                                                )
                                            })}
                                        </Row>
                                    </Column>
                                )
                            })}
                        </Column>
                    )}
                </Column>
                <div className={`${styles.day}`}>
                    <RowSpaced>
                        <h4>{data.time.format('dddd')}</h4>
                    </RowSpaced>
                    <div className={styles.day__list}>
                        {data.going.map(item => <small onClick={() => remove_handler(item.id)} className={`${styles.day__user} ${styles.day__user__highlight}`}>{item.user_data.name}</small>)}
                    </div>
                </div>
            </Grid>
    )
}