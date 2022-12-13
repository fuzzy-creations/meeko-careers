import { useEffect, useState, useContext } from 'react';
import styles from '../../../styles/components/main/Profile.module.scss';
import { AuthContext } from '../../../contexts/Auth.context';
import generatePushID from '../../../tools/IDGenerator';
import Text_Input from '../../inputs/Text_Input';
import Number_Input from '../../inputs/Number_Input';
import Button_Main from '../../buttons/Button_Main';
import Times_List from '../../lists/Times_List';
import { get_diff, get_now, populate_24_hours } from '../../../tools/DateTime_Methods';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Toggle from '../../inputs/Toggle';
import Check_box from '../../inputs/Check_Box';
import { create_offer, update_application_message, update_application_status } from '../../../firebase/methods/Applicant_Functions';
import { create_position, update_position } from '../../../firebase/methods/Position_Functions';
import { Column, form_header, form_selectable, Row, Table } from '../../../tools/global_components';
import { management } from '../../../tools/global_variables';
import Header_Modal from '../../headers/Header_Modal';


function Edit_Position (props) {
    const data = props.data;

    const [title, set_title] = useState(data.title);
    const [type, set_type] = useState(data.type);
    const [salary, set_salary] = useState(data.salary);


    const [hours, set_hours] = useState(data.hours.fixed === true ? 0 : 1);
    const [bonus, set_bonus] = useState(data.bonus ? 0 : 1);

    const [probation, set_probation] = useState(data.probation.exists === true ? 0 : 1);

    const [paid_lunch, set_paid_lunch] = useState(data.hours.paid_lunch);


    const [match_probation_salary, set_match_probation_salary] = useState(true);
    const [match_probation_bonus, set_match_probation_bonus] = useState(true);
    const [start, set_start] = useState("");


    const [bonus_pay, set_bonus_pay] = useState(data.bonus);
    const [annual_leave, set_annual_leave] = useState(data.annual_leave);
    const [paid_sick, set_paid_sick] = useState(data.paid_sick);
    const [benefits, set_benefits] = useState(data.benefits);

    const [probation_duration, set_probation_duration] = useState(data.probation.duration);
    const [probation_salary, set_probation_salary] = useState(data.probation.salary);
    const [probation_bonus, set_probation_bonus] = useState(data.probation.bonus);
    
    const [working_hours, set_working_hours] = useState(data.hours.length);
    const [lunch_duration, set_lunch_duration] = useState(data.hours.lunch);
    const [start_time_selected, set_start_time_selected] = useState(2);
    const [end_time_selected, set_end_time_selected] = useState(18);
    
    const [benefits_input, set_benefits_input] = useState("");
    const [form_display, set_form_display] = useState(0);

    const times_list = populate_24_hours();


    const per_week = hours === 1 ? working_hours : (get_diff(times_list[end_time_selected], times_list[start_time_selected]) - lunch_duration) * 5;
    const day_rate = parseInt((salary * 12 / 52) / per_week);


    const submit_handler = () => {
        const _probation = probation === 0 ? true : false;
        const fixed = hours === 0 ? true : false;

        const item = {
            title: title,
            type: type,
            salary: salary,
            start_date: start,
            bonus: bonus_pay,
            annual_leave: annual_leave,
            paid_sick: paid_sick,
            benefits: benefits,
            probation: {
                exists: _probation,
                duration: probation_duration,
                salary: match_probation_salary ? salary : probation_salary,
                bonus: match_probation_bonus ? bonus : probation_bonus,
            },
            hours: {
                fixed: fixed,
                length: fixed ? per_week : working_hours,
                start: fixed ? times_list[start_time_selected] : null,
                end: fixed ? times_list[end_time_selected] : null,
                lunch: fixed ? lunch_duration : null,
                paid_lunch: fixed ? paid_lunch : null
            }   
        };

        update_position(data.id, item);
        props.back();

    };


    const start_time = <Times_List list={times_list} selector={(e) => {set_start_time_selected(e); set_form_display(0);}} selected={start_time_selected} />
    const end_time = <Times_List list={times_list} selector={(e) => {set_end_time_selected(e); set_form_display(0);}} selected={end_time_selected} />


    const flexible_hours = (
        <Number_Input value={working_hours} input={set_working_hours} tag="hours">Hours per week</Number_Input>
    )

    const fixed_hours = (
        <>
        <Row gap={2} nowrap={true}>
            <small className={styles.grid__button} onClick={() => set_form_display(1)}>{start_time_selected === null ? "Start Time" : times_list[start_time_selected]}</small>
            <p class="bold">-</p>
            <small className={styles.grid__button} onClick={() => set_form_display(2)}>{end_time_selected === null ? "Finish Time" : times_list[end_time_selected]}</small>
        </Row>
        <Row gap={2} nowrap={true}>
            <Number_Input value={lunch_duration} input={set_lunch_duration} tag="hour(s)">Lunch Duration</Number_Input>
            <Check_box value={paid_lunch} input={set_paid_lunch}>Paid</Check_box>
        </Row>
        </>
    )


    const hours_content = [fixed_hours, flexible_hours]

    const probation_form = (
        <>
        <Number_Input value={probation_duration} input={set_probation_duration} tag="months">Duration</Number_Input>
        <Row gap={2} nowrap={true}>
            <Number_Input invalid={match_probation_salary} value={probation_salary} input={set_probation_salary} tag="/month">Salary</Number_Input>
            <Check_box value={match_probation_salary} input={set_match_probation_salary}>Salary</Check_box>
        </Row>
        <Row gap={2} nowrap={true}>
            <Number_Input invalid={match_probation_bonus} value={probation_bonus} input={set_probation_bonus} tag="/month">Bonus</Number_Input>
            <Check_box value={match_probation_bonus} input={set_match_probation_bonus}>Bonus</Check_box>
        </Row>
        </>
    );


    const form = (
        <Column gap={2}>
            <Header_Modal name={data.name}>Edit Position</Header_Modal>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>
            {form_header("Title", "Fill in position title")}
            <Text_Input value={title} input={set_title}>Title</Text_Input>

            {form_header("Salary", "Fill in required salary per month")}
            <Number_Input value={salary} input={set_salary} tag="/month">Salary</Number_Input>
            {/* <Row gap={5}>
                <p class="bold">Hourly rate:</p><p>{day_rate}</p>
                <p class="bold">Annual Rate:</p><p>{parseInt(salary * 12)}</p>
            </Row> */}

            {form_header("Management", "Select the management type")}
            <Column fixed={true} gap={1}>
                {form_selectable(type, 0, "Onsite", set_type )}
                {form_selectable(type, 1, "Hot Desk", set_type )}
                {form_selectable(type, 2, "Remote with Equipment", set_type )}
                {form_selectable(type, 3, "Remote without Equipment", set_type )}
            </Column>

            {form_header("Bonus", "Fill in maximum bonus per month")}
            <Column fixed={true} gap={1}>
                {form_selectable(bonus, 0, "Bonus", set_bonus )}
                {form_selectable(bonus, 1, "No Bonus", set_bonus )}
            </Column>

            <Column fixed={true}  gap={1}>
                {bonus === 0 ?  <Number_Input value={bonus_pay} input={set_bonus_pay} tag="/month">Max Bonus</Number_Input> : null}
            </Column>
            
            {form_header("Hours", "Fill in required hours per day info")}

            <Column fixed={true}  gap={1}>
                {form_selectable(hours, 0, "Fixed working hours per day", set_hours )}
                {form_selectable(hours, 1, "Flexible working hours", set_hours )}
            </Column>

            <Column fixed={true}  gap={1}>
                {hours_content[hours]}
            </Column>

            {form_header("Annual Leave", "Fill in amount of paid annual leave")}
            <Number_Input value={annual_leave} input={set_annual_leave} tag="Days">Annual leave days</Number_Input>

            {form_header("Sick Leave", "Fill in amount of paid sick days")}
            <Number_Input value={paid_sick} input={set_paid_sick} tag="Days">Paid Sick Days</Number_Input>

            {form_header("Probation", "Fill in whether there is a probation period")}
            <Column fixed={true} gap={1}>
                {form_selectable(probation, 0, "Probation", set_probation )}
                {form_selectable(probation, 1, "No probation", set_probation )}
            </Column>

            <Column fixed={true} gap={1}>
                {probation === 0 ? probation_form : null}
            </Column>

            {form_header("Benefits", "Fill in additional benefits")}
            <Row gap={2} nowrap={true}>
                <Text_Input value={benefits_input} input={set_benefits_input}>Benefit</Text_Input>
                <Button_Main width={10} action={() => {set_benefits([...benefits, benefits_input]); set_benefits_input("");}}>Add</Button_Main>
            </Row>
            {benefits.map(item => <p class="bold medium">- {item}</p>)}
        </Column>
    )

    const display_content = [form, start_time, end_time]

    return (
        <section className={styles.right__wrapper}>
            {display_content[form_display]}
            <section className={styles.right__actions}>
                <Row gap={2}>
                    <Button_Main action={props.back} width={20}>Back</Button_Main>
                    <Button_Main action={submit_handler} width={20}>Save</Button_Main>
                </Row>
            </section>
        </section>
    )
};

export default Edit_Position;
