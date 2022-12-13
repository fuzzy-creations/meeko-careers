import { useEffect, useState, useContext } from 'react';
import styles from '../../styles/components/forms/Create.module.scss';
import { convert_to_firebase, get_diff, get_now, populate_24_hours } from '../../tools/DateTime_Methods';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Column, form_header, form_info, Row } from '../../tools/global_components';
import logo from '../../assets/logo.png';
import Logo from '../UI/Logo';
import Calendar_Input from '../inputs/Calendar_Input';
import Header_Modal from '../headers/Header_Modal';
import Button_Main from '../buttons/Button_Main';
import { select_application } from '../../firebase/methods/Applicant_Functions';
import { create_employee } from '../../firebase/methods/Employee_Functions';
import generatePushID from '../../tools/IDGenerator';
import { select_applicant } from '../../firebase/methods/Post_Functions';


function Create_Offer (props) {
    const [selected, set_selected] = useState(0);
    const [start, set_start] = useState(null);
    const [end, set_end] = useState(null);
    const data = props.data;
    const application = props.application;
    const company = props.company;
    const employee = null;
    const user_data = props.user_data;

    const offer_handler = () => {
        const id = generatePushID();
        const item = {
            employee_id: id,
            company_id: company.id,
            position_id: data.id,
            user_id: user_data.id,
            probation: data.probation
        };

        const dates = {
            start: new Date(convert_to_firebase(start)),
            end: end ? new Date (convert_to_firebase(end)) : null
        }

        select_applicant(application.post_id);
        select_application(application.application_id, id);
        create_employee(item, dates);
        props.close();
        // create_offer(data.application_id, item);
    };

    console.log(props)

    const form = ( 
        <main className={styles.form}>
        <Column gap={2}>
            <Header_Modal >Create Offer</Header_Modal>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>
            {form_header("Start Date", "Fill in the required start date.")}
            <Calendar_Input value={start} input={set_start}>Start</Calendar_Input>
            {form_header("Optional: End Date", "Fill in the required end date.")}
            <Calendar_Input value={end} input={set_end}>End</Calendar_Input>

        </Column>
        <section className={styles.actions}>
            <Row gap={1}>
                <Button_Main width={20} action={props.close}>Back</Button_Main>
                <Button_Main width={20} active={start} action={() => set_selected(1)}>Next</Button_Main>
            </Row>
        </section>
    </main>
    );

    const contract = (
        <main className={styles.form}>
            <Column gap={2}>
            <Header_Modal >Create Offer</Header_Modal>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend eu nisl ornare iaculis. Aliquam lobortis lectus eu mi consectetur auctor. Aliquam tellus lacus, sollicitudin condimentum condimentum id</small>
                <section>
                    <Logo width={15} />
                    <p class="bold">Private and confidential</p>
                    <p>{user_data ? user_data.name : "TBD"}</p>
                    <p>{get_now()}</p>
                </section>

                <section>
                    <p class="bold">Dear {user_data ? user_data.name.split(" ")[0] : "TBD"}</p>
                    <p>We are pleased to offer you the position of <span class="bold">{data.title}</span> at <span class="bold">{company.name}</span>, with the following terms and conditions of employment</p>
                </section>

                <section>
                    <p class="bold">Start Date</p>
                    <p>{start}</p>
                </section>

                {end ? <section>
                    <p class="bold">End Date</p>
                    <p>{end}</p>
                </section> : null}

                {data.probation.exists ? <section>
                    <p class="bold">Probation Period</p>
                    <p>{data.probation.duration} months</p>
                    <p>During your probation you'll be paid {data.probation.salary} and a maximum of {data.probation.bonus} per month in bonuses.</p>
                </section> : null}

                <section>
                    <p class="bold">Remuneration</p>
                    <p> {data.probation.exists ? "After successful completion of your probation, y" : "Y"}our salary will be calculated as follows:</p>
                    <li>Base Salary = {data.salary}</li>
                    {form_info("Your hourly rate is calculated using this base salary at 40 hours per week")}
                    <li>Hourly Rate = </li>
                    <li>Bonus - Up to {data.bonus}</li>
                </section>

                <section>
                    <p class="bold">Hours and Leave</p>
                    <p>{data.hours.length} per week</p>
                    {data.hours.fixed ? <p>Fixed hours are {data.hours.start} until {data.hours.end} with {data.hours.lunch} hour(s) {data.hours.paid_lunch ? "paid" : "unpaid"} for lunch Monday to Friday</p> : null}
                    <p>{data.annual_leave} annual leave days</p>
                    <p>{data.paid_sick} paid sick days</p>
                </section>

                {data.benefits.length === 0 ? null : <section>
                    <p class="bold">Additional Benefits:</p>
                    {data.benefits.map(item => <p>- {item}</p>)}
                </section>}

            </Column>
            <section className={styles.actions}>
                <Row gap={1}>
                    <Button_Main width={20} action={() => set_selected(0)}>Back</Button_Main>
                    <Button_Main width={20} action={offer_handler}>Create</Button_Main>
                </Row>
            </section>
        </main>
    );

    const content = [form, contract]

    return content[selected];
};

export default Create_Offer;
