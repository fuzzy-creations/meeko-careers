import { useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import generatePushID from '../../tools/IDGenerator';
import Button_Main from '../buttons/Button_Main';
import { convert_to_firebase } from '../../tools/DateTime_Methods';
import { Column, form_header, Row } from '../../tools/global_components';
import { create_employee } from '../../firebase/methods/Employee_Functions';
import { fill_position } from '../../firebase/methods/Position_Functions';
import Header_Modal from '../headers/Header_Modal';
import Avatar from '../items/Avatar';
import Calendar_Input from '../inputs/Calendar_Input';


function Create_Employee (props) {
    const user_data = props.user_data;
    const data = props.data
    const [start, set_start] = useState(null);
    const [end, set_end] = useState(null);


    const submit_handler = () => {
        
        const id = generatePushID();
        const item = {
            employee_id: id,
            company_id: data.company_id,
            position_id: data.id,
            user_id: user_data.id,
            probation: data.probation.exists
        };

        const dates = {
            start: new Date(convert_to_firebase(start)),
            end: end ? new Date (convert_to_firebase(end)) : null
        };
        
        create_employee(item, dates);
        fill_position(data.id, id)
    };


    return (
        <section className={styles.right__wrapper} style={{position: "relative"}}>
            <Column gap={2}>
                <Header_Modal name={"Create Employee"}>{user_data.name}</Header_Modal>
                <Avatar start={true}>{user_data.avatar}</Avatar>  
                {form_header("Start Date", "Fill in required start date")}
                <Calendar_Input value={start} input={set_start}>Select Date</Calendar_Input>
                {form_header("Optional: End Date", "Fill in end date if required")}
                <Calendar_Input value={end} input={set_end}>Select Date</Calendar_Input>
            </Column>
            <section className={styles.right__actions}>
                <Row gap={2}>
                    <Button_Main width={20} action={props.close}>Back</Button_Main>
                    <Button_Main width={20} active={start} action={submit_handler}>Create</Button_Main>        
                </Row>
            </section>
        </section>
    );
};

export default Create_Employee;
