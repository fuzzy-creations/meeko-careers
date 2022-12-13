import { useEffect, useState, useContext } from 'react';
import { calendar, get_diff, get_now, populate_24_hours } from '../../tools/DateTime_Methods';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Column, form_info, Row } from '../../tools/global_components';
import Logo from '../UI/Logo';


function View_Contract (props) {
    const data = props.data;
    const company = props.company;
    const employee = props.employee;
    const user_data = props.user_data;

    // const per_week = hours === 1 ? working_hours : (get_diff(times_list[end_time_selected], times_list[start_time_selected]) - lunch_duration) * 5;
    // const day_rate = parseInt((salary * 12 / 52) / per_week)


    return (
        <Column gap={2} fixed={true}>
            <section>
                <Logo width={15} />
                <p class="bold">Private and confidential</p>
                <p>{user_data ? user_data.name : "TBD"}</p>
                <p>{employee ? calendar(employee.timestamp) : "TBD"}</p>
            </section>

            <section>
                <p class="bold">Dear {user_data ? user_data.name.split(" ")[0] : "TBD"}</p>
                <p>We are pleased to offer you the position of <span class="bold">{data.title}</span> at <span class="bold">{company.name}</span>, with the following terms and conditions of employment</p>
            </section>

            <section>
                <p class="bold">Start Date</p>
                <p>{employee ? calendar(employee.start_date) : "TBD"}</p>
            </section>

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
    );
};

export default View_Contract;
