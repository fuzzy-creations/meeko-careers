import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/components/forms/Create.module.scss';
import { interview_duration, interview_types } from '../../tools/global_variables';
import Button_Main from '../buttons/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import Calendar from '../items/Calendar';
import Times_List from '../lists/Times_List';
import moment from 'moment';
import { update_interview } from '../../firebase/methods/Applicant_Functions';
import { interview_status, applicant_interview_status } from '../../tools/global_variables';
import { get_date, get_day_date_month, get_time } from '../../tools/DateTime_Methods';
import { get_user_data } from '../../firebase/methods/User_Functions';
import { Column, Row, RowSpaced } from '../../tools/global_components';
import Header_Modal from '../headers/Header_Modal';
import { delete_interview, select_interview_time, cancel_interview } from '../../firebase/methods/Interview_Function';
import Button_Outline from '../buttons/Button_Outline';

function Applicant_Interview (props) {
    const [date_selected, set_date_selected] = useState(null);
    const [time_selected, set_time_selected] = useState(null);
    const [delete_controller, set_delete_controller] = useState(false);
    const [manager, set_manager] = useState({});
    const data = props.data;

    console.log(props)


    const times_list = [... new Set(data.slots.map(time => moment.unix(time).format('hh:mm a')))];

    const schedule_handler = () => {
        const converted_date = date_selected.format('YYYY-MM-DD');
        const converted_time = times_list[time_selected];
        const combined = (`${converted_date} ${converted_time}`);
        const seconds = moment(combined, 'YYYY-MM-DD hh:mm a').format("X");
        select_interview_time(data.id, seconds);
        props.close();
    };

    const delete_handler = () => {
        cancel_interview(data.id);
        props.close()
    };

    const delete_form = (
        <main className={styles.form}>
            <section>
                <h4>Are you sure you want to delete this interview?</h4>
                <small>Lorem ipsum dolor sit amet</small>
            </section>
            <section className={styles.actions}>
                <Row gap={2}>
                    <Button_Outline height={4}  action={() => set_delete_controller(false)}>Cancel</Button_Outline>
                    <Button_Main width={20} action={delete_handler}>Confirm</Button_Main>
                </Row>
            </section>
        </main>
    ); 



    const main = (
        <main className={styles.form}>
        <Column gap={2} paddingBottom={2}>

            <section className={styles.modal__header}>
                <img src={data.manager.avatar} />
                <div>
                    <h3 class="medium">{applicant_interview_status[data.status]}</h3>
                    <h2>{interview_types[data.type]}</h2> 
                </div>
            </section>

            <div className={styles.icon__wrapper}>
                <Row gap={1}><FaClock /><h4 class="medium">{data.manager.name}</h4></Row>
                <Row gap={1}><FaClock /><h4 class="medium">{get_date(data.time)}</h4></Row>
                <Row gap={1}><FaClock /><h4 class="medium">{get_time(data.time)}</h4></Row>
                <Row gap={1}><FaClock /><h4 class="medium">{interview_duration[data.duration]}</h4></Row>
                <Row gap={1}><FaInfoCircle /><h4 class="medium">{data.contact}</h4></Row>
            </div>

            <small>{data.message}</small>

        </Column>
        <section className={styles.actions}>
            <Row gap={2}>
                <Button_Main width={20} action={props.close}>Back</Button_Main>
                {/* <Button_Outline height={4}  action={() => set_delete_controller(true)}>Delete</Button_Outline> */}
            </Row>
        </section>
    </main>
    );


    
    const select = (
        <main className={styles.form}>
            <Column gap={2} paddingBottom={2}>

                <section className={styles.modal__header}>
                    <img src={data.manager.avatar} />
                    <div>
                        <h3 class="medium">{applicant_interview_status[data.status]}</h3>
                        <h2>{interview_types[data.type]}</h2> 
                    </div>
                </section>

                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>

                <h4>Select a Date & Time</h4>     
                <section className={styles.date}> 
                    <div className={styles.date__day}>
                        <Calendar rules={false} schedule={true} available={data.slots} set_date_selected={set_date_selected} />
                    </div>
                    <div className={styles.date__time}>
                        <h5 class="bold" style={{marginBottom: "1rem"}}>{date_selected ? get_day_date_month(date_selected) : "Pick a Date"}</h5>
                        <Times_List list={times_list} array={false} selector={(e) => set_time_selected(e)} selected={time_selected} />
                    </div>
                </section>

            </Column>
            <section className={styles.actions}>
                <Row gap={2}>
                    <Button_Main width={20} action={props.close}>Back</Button_Main>
                    {/* <Button_Outline height={4} action={() => set_delete_controller(true)}>Delete</Button_Outline> */}
                    <Button_Main width={20} action={schedule_handler} active={date_selected && time_selected}>Schedule</Button_Main>
                </Row>
            </section>
        </main>
    );


    return delete_controller ? delete_form : (data.time || data.closed ? main : select);
};

export default Applicant_Interview;