import { useEffect, useState, useContext, useRef } from 'react';
import styles from '../../styles/components/forms/Create.module.scss';
import { AuthContext } from '../../contexts/Auth.context';
import generatePushID from '../../tools/IDGenerator';
import Text_Input from '../inputs/Text_Input';
import Number_Input from '../inputs/Number_Input';
import Button_Main from '../buttons/Button_Main';
import Times_List from '../lists/Times_List';
import { get_diff, get_now, populate_24_hours } from '../../tools/DateTime_Methods';
import { FaChevronRight, FaChevronLeft, FaClock, FaInfoCircle } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Toggle from '../inputs/Toggle';
import Check_box from '../inputs/Check_Box';
import { create_interview } from '../../firebase/methods/Interview_Function';
import { create_position } from '../../firebase/methods/Position_Functions';
import { Column, form_header, form_selectable, Row, RowSpaced, Table } from '../../tools/global_components';
import { interview_duration, interview_types, management } from '../../tools/global_variables';
import Header_Modal from '../headers/Header_Modal';
import moment from 'moment';
import Textarea_Input from '../inputs/Textarea_Input';
import Calendar_Input from '../inputs/Calendar_Input';
import Calendar from '../items/Calendar';
import Button_Outline from '../buttons/Button_Outline';
import { interview_application } from '../../firebase/methods/Applicant_Functions';

function Create_Interview (props) {
    const job_data = props.job_data;
    const application_data = props.application_data;
    const applicant_data = props.user_data;
    const { user_data } = useContext(AuthContext);
    const [selected, set_selected] = useState(0);
    const [type, set_type] = useState(null);
    const [duration, set_duration] = useState(null);
    const [message, set_message] = useState(null);
    const [contact, set_contact] = useState(null);
    const [date_selected, set_date_selected] = useState([]);
    const [time_selected, set_time_selected] = useState([]);
    const next_24_hours = populate_24_hours();
    const calender_ref = useRef();
    const [start, set_start] = useState()

    const toggle_time_selected = (e) => time_selected.includes(e) ? set_time_selected(time_selected.filter(item => item !== e)) : set_time_selected([...time_selected, e]);

    const _get_dates = () => {

        const calender_dates = (() => calender_ref.current.get_dates())();

        const total = calender_dates.map(date => {
            const items = [];
            const converted_date = date.format('YYYY-MM-DD');
            
            time_selected.forEach(time => {
                const converted_time = next_24_hours[time];
                const combined = (`${converted_date} ${converted_time}`);
                const seconds = moment(combined, 'YYYY-MM-DD hh:mm a').format("X");
                items.push(seconds);

            });
            return items;
        });

        return total.flat();
    };


    const submit_handler = () => {

        const interview_id = generatePushID();
        const slots = _get_dates();

        const interview_item = {
            managers: user_data.id,
            id: interview_id,
            type: type,
            application_id: application_data.application_id,
            applicant: applicant_data.id,
            duration: duration,
            position_id: application_data.position_id,
            post_id: job_data.post_id,
            company_id: job_data.company_id,
            contact: contact, 
            message: message,
            slots: slots
        };


        try {
            create_interview(interview_item);
            interview_application(application_data.application_id);
            props.close();
            // update_application_status(application_data.application_id, 3)
            // update_application_message(application_data.application_id, job_data.templates.interviews);
        } catch(error) {
            alert("Error");
        };
    
    };

    const select_all_handler = () => {
        if(time_selected.length === 26) { set_time_selected([]) } else { set_time_selected([...Array(next_24_hours.length).keys()]) }
    };


    const first_form = (
        <main className={styles.form}>
            <Column gap={2} paddingBottom={2}>
                <Header_Modal name={"Information"}>Create Interview</Header_Modal>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>
            
                {form_header("Type", "Select the management type")}
                <Column fixed={true} gap={1}>
                    {form_selectable(type, 0, "Phone Call", set_type )}
                    {form_selectable(type, 1, "Video Call", set_type )}
                    {form_selectable(type, 2, "In-Person", set_type )}
                    {form_selectable(type, 3, "Technical", set_type )}
                </Column>

                {form_header("Duration", "Select the management type")}
                <Column fixed={true} gap={1}>
                    {form_selectable(duration, 0, "15 min", set_duration )}
                    {form_selectable(duration, 1, "30 min", set_duration )}
                    {form_selectable(duration, 2, "45 min", set_duration )}
                    {form_selectable(duration, 3, "60 min", set_duration )}
                </Column>

                {form_header("Contact", "Fill in the contact details.")}
                <Text_Input value={contact} input={set_contact} tag="Days">Number/URL/Address</Text_Input>

                {form_header("Message", "Fill in all the necessary information.")}
                <Textarea_Input value={message} input={set_message} tag="Days">Message</Textarea_Input>

            </Column>
            <section className={styles.actions}>
                <Row gap={2}>
                    <Button_Main width={20} action={() => props.close()}>Back</Button_Main>
                    <Button_Main width={20} active={type && duration && contact && message} action={() => set_selected(1)}>Next</Button_Main>
                </Row>
            </section>
        </main>
    );

    const second_form = (
        <main className={styles.form}>
            <Column gap={2}>
                <Header_Modal name={"Date and Time"}>Create Interview</Header_Modal>
                <Row gap={2}>
                    <small><FaClock /> {interview_types[type]}</small>
                    <small><FaClock /> {interview_duration[duration]}</small>
                    <small><FaInfoCircle /> {contact}</small>
                </Row>

                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>
                
                <RowSpaced>
                   
                    <div className={styles.date__day}>
                        <Calendar rules={true} ref={calender_ref} schedule={true} />
                    </div>
                    <div className={styles.date__time}>
                        <small onClick={select_all_handler}>Select all</small>
                        <Times_List list={next_24_hours} array={true} selector={(e) => toggle_time_selected(e)} selected={time_selected} />
                    </div>
                </RowSpaced>
            
            </Column>

            <section className={styles.actions}>
                <Row gap={2}>
                    <Button_Main width={20} action={() => set_selected(0)}>Back</Button_Main>
                    <Button_Main width={20} active={time_selected.length > 0} action={submit_handler}>Create</Button_Main>
                </Row>
            </section>
        </main>
    )

    const content = [first_form, second_form]

    return content[selected];
};

export default Create_Interview;
