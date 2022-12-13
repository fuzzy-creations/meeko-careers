import { useEffect, useState, useContext, useRef } from 'react';
import styles from '../../styles/components/forms/Create.module.scss';
import { Column, form_header, form_selectable, Row, RowSpaced, Table } from '../../tools/global_components';
import moment from 'moment';
import Button_Outline from '../buttons/Button_Outline';
import { update_interview, update_interview_contact } from '../../firebase/methods/Applicant_Functions';
import { interview_duration, interview_status, interview_types } from '../../tools/global_variables';
import Button_Main from '../buttons/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import Edit_Icon from '../items/Edit_Icon';
import Edit_Input from '../items/Edit_Input';
import { get_date, get_time } from '../../tools/DateTime_Methods';
import Header_Modal from '../headers/Header_Modal';
import { cancel_interview, delete_interview } from '../../firebase/methods/Interview_Function';

function View_Interview (props) {
    const user_data = props.user_data;
    const data = props.data;
    const [selected, set_selected] = useState(0);
    const [edit_contact, set_edit_contact] = useState(false);
    const [contact, set_contact] = useState(data.contact);


    const now = moment();
    const last_slot = moment.unix(Math.max(...data.slots));
    const expired = last_slot.isBefore(now);


    // useEffect(() => {
    //     if(data.status === 2 && expired === true) { update_interview(data.application_id, data.id, "status", 1) }
    //     if(data.status === 3 && moment.unix(data.time).isBefore(now)) { update_interview(data.application_id, data.id, "status", 4) }
    // }, [])


    const delete_handler = () => {
        cancel_interview(data.id);
        props.close()
    }

    const save_handler = () => {
        update_interview_contact(data.application_id, data.id, contact)
    }

    const delete_form = (
        <main className={styles.form}>
        <section>
            <h4>Are you sure you want to cancel this interview?</h4>
            <small>Lorem ipsum dolor sit amet</small>
        </section>
        <section className={styles.actions}>
            <Row gap={2}>
                <Button_Outline height={4} action={() => set_selected(0)}>Cancel</Button_Outline>
                <Button_Main width={20} action={delete_handler}>Confirm</Button_Main>
            </Row>
        </section>
    </main>
    );      



    const first_form = (
        <main className={styles.form}>
            <Column gap={2} paddingBottom={2}>
                <Header_Modal name={interview_status[data.status]}>{interview_types[data.type]}</Header_Modal>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor.</small>

                <div className={styles.icon__wrapper}>
                    { data.time ?
                        <>
                        <Row gap={1}><FaClock /><h4 class="medium">{get_date(data.time)}</h4></Row>
                        <Row gap={1}><FaClock /><h4 class="medium">{get_time(data.time)}</h4></Row>
                        </>
                    : null}
                    <Row gap={1}><FaClock /><h4 class="medium">{interview_duration[data.duration]}</h4></Row>
                    <Row gap={1}><FaInfoCircle /><h4 class="medium">{edit_contact ? <Edit_Input save={save_handler} value={contact} placeholder={contact} input={set_contact} name="contact" /> : contact}</h4><Edit_Icon value={edit_contact} toggle={set_edit_contact} /></Row>
                </div>

                <small>{data.message}</small>
                
            </Column>
            <section className={styles.actions}>
                <Row gap={2}>
                    <Button_Outline height={4} action={() => props.close()}>Back</Button_Outline>
                    {data.closed ? null : <Button_Main action={() => set_selected(1)}  width={20}>Cancel</Button_Main>}
                    {/* <Button_Main width={20}>Complete</Button_Main> */}
                </Row>
            </section>
        </main>
    );

    const content = [first_form, delete_form]

    return content[selected];
};

export default View_Interview;
