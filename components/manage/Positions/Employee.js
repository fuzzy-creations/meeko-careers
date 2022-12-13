import { useState } from 'react';
import styles from '../../../styles/components/main/Profile.module.scss';
import { calendar, time_since } from '../../../tools/DateTime_Methods';
import { Column, ColumnSpaced, form_header, Grid, Line, Modal, Row, RowSpaced, Table } from '../../../tools/global_components';
import moment  from 'moment';
import Header_Modal from '../../headers/Header_Modal';
import Button_Main from '../../buttons/Button_Main';
import { MdLocationOn } from "react-icons/md";
import View_Invoice from '../../forms/View_Invoice';
import Invoice_Preview from '../../previews/Invoice_Preview';
import View_Contract from '../../items/Contract';
import Card_Medium from '../../items/Card_Medium';
import { vacate_position } from '../../../firebase/methods/Position_Functions';
import { delete_employee } from '../../../firebase/methods/Employee_Functions';



function Employee_Preview (props) {
    const [selected, set_selected] = useState(0);
    const employee = props.employee;
    const user = props.employee.user_data;
    const position = props.position;
    const company = props.company;
    console.log(props)

    const delete_offer_handler = () => {
        vacate_position(position.id);
        delete_employee(employee.employee_id);
    };


    const details = (
        <ColumnSpaced gap={7} marginTop={2}>
            <RowSpaced nowrap={true}>
                <Card_Medium name={"Start Date"}>{calendar(employee.start_date)}</Card_Medium>
                <Card_Medium name={"End Date"}>{employee.end_date ? calendar(employee.end_date) : "---"}</Card_Medium>
                <Card_Medium name={"Probation"}>{employee.probation.exists ? "6 months" : "Complete"}</Card_Medium>
            </RowSpaced>
            <RowSpaced gap={2} start={true}>
                <Column gap={2} fixed={true}>
                    <h4 className={styles.title}>Employee Details</h4>
                    <Table>
                        <p class="bold">Phone</p><p>{employee.user_data.phone}</p>
                        <p class="bold">Email</p><p>{employee.user_data.email}</p>
                        <p class="bold">Last Seen</p><p>{time_since(employee.user_data.activity)}</p>
                        <p class="bold">Location</p><p>Kyiv, Ukraine</p>
                    </Table>
                </Column>
                <div></div>
                <Column gap={2} fixed={true}>
                    <h4 className={styles.title}>Tasks</h4>
                    <Column gap={2} fixed={true}>
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>05</p></div>
                        <div className={styles.calender__content}>
                            <p>Invoice</p>
                            <small>Pending</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>Monthly</p>
                        </div>
                    </div>
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>12</p></div>
                        <div className={styles.calender__content}>
                            <p>Rota</p>
                            <small>Pending</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>Weekly</p>
                        </div>
                    </div>
                </Column>
            </Column>
            </RowSpaced>
                <section className={styles.info}>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Annual Leave</p>
                        <h4 className={styles.bold}>11</h4>
                        <small>Remain</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Sick Leave</p>
                        <h4 className={styles.bold}>11</h4>
                        <small>Remain</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Bonus</p>
                        <h4 className={styles.bold}>Tier 3</h4>
                        <small>Quarter</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Contract</p>
                        <h4 className={styles.bold}>Signed</h4>
                        <small>11/08/2021</small>
                    </div>
            </section>
               

        </ColumnSpaced>
    );

    const requests = <Column><h4>Requests</h4></Column>
    
    const invoices = (
        <Column>
            <Row gap={3}>
                {employee.invoices.map(item => <Invoice_Preview embedded={true} manager={true} data={item} user_data={user} />)}
            </Row>
        </Column>
    )

    const performance = <Column><h4>Requests</h4></Column>;

    const delete_offer = (
        <Column>
            <h4>Delete Offer</h4>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat dolor augue, ac fermentum velit pharetra sit amet. In ut sem eu lectus dignissim elementum.</small>
        </Column>
    );

    
    const content = [details, requests, invoices, performance, <View_Contract data={position} company={company} user_data={user} employee={employee} />]
    const menu = ["Profile", "Requests", "Invoices", "Performance", "Contract"];

    return employee.accepted ? (
        <main className={styles.right__wrapper}>
            <Column gap={2}>
                <RowSpaced>
                <Header_Modal name={"Employee"}>{user.name}</Header_Modal>
                    <Row gap={1.5}>
                        {menu.map((item, index) => <div className={selected === index ? styles.profile_nav__selected : styles.profile_nav} onClick={() => set_selected(index)}><small>{item}</small></div>)}
                    </Row>
                </RowSpaced>
                {content[selected]}
            </Column>
            <section className={styles.right__actions}>
                {props.close ? <Button_Main action={props.close} width={20}>Back</Button_Main> : null}
                {selected === 0 ? <Button_Main width={20}>Review</Button_Main> : null}
                {selected === 4 ? <Button_Main width={20}>Terminate Contract</Button_Main> : null}
            </section>
        </main>
    ) : (
        <main className={styles.right__wrapper}>
            <Column gap={5}>
                <Header_Modal name={"Offer Made"}>{user.name}</Header_Modal>
                <RowSpaced nowrap={true}>
                    <Card_Medium name={"Start Date"}>{calendar(employee.start_date)}</Card_Medium>
                    <Card_Medium name={"End Date"}>{employee.end_date ? calendar(employee.end_date) : "---"}</Card_Medium>
                    <Card_Medium name={"Accepted"}>False</Card_Medium>
                </RowSpaced>
                {selected === 0 ? <View_Contract data={position} company={company} user_data={user} employee={employee} /> : delete_offer}
            </Column>
            <section className={styles.right__actions}>
                <Row gap={2}>
                    {props.close ? <Button_Main action={props.close} width={20}>Back</Button_Main> : null}
                    {selected === 0 ? <Button_Main action={() => set_selected(1)} width={20}>Delete Offer</Button_Main> : null}
                    {selected === 1 ? <Button_Main action={() => set_selected(0)} width={20}>Cancel</Button_Main> : null}
                    {selected === 1 ? <Button_Main action={delete_offer_handler} width={20}>Confirm</Button_Main> : null}
                </Row>
            </section>
        </main>
    )
};

export default Employee_Preview;


{/* <Table>
<p class="bold">Start Date</p><p>25/02/2022</p>
<p class="bold">End Date</p><p>---</p>

<p class="bold">Probation</p><p>Complete</p>

<p class="bold">Address</p><p>49, Taylor Street</p>

<p class="bold">Phone</p><p>020 2342 121</p>
<p class="bold">Email</p><p>anna@gmail.com</p>

<p class="bold">Annual Leave Used</p><p>0</p>
<p class="bold">Sick Leave Used</p><p>0</p>
<p class="bold">Contract</p><p>Signed</p>
</Table>
<p>Tasks</p>
<p>Requests</p>
<p>Schedule</p> */}


 {/* <div className={styles.menu__item}>
        <div className={`shape_pink ${styles.menu__icon}`}></div>
        <p className={styles.menu__text}>Profile</p> 
    </div>
    <div className={styles.menu__item}>
        <div className={`shape_pink ${styles.menu__icon}`}></div>
        <p className={styles.menu__text}>Requests</p> 
    </div>
    <div className={styles.menu__item}>
        <div className={`shape_pink ${styles.menu__icon}`}></div>
        <p className={styles.menu__text}>Invoices</p> 
    </div>
    <div className={styles.menu__item}>
        <div className={`shape_pink ${styles.menu__icon}`}></div>
        <p className={styles.menu__text}>Attendance</p> 
    </div>
    <div className={styles.menu__item}>
        <div className={`shape_pink ${styles.menu__icon}`}></div>
        <p className={styles.menu__text}>Contract</p> 
    </div> */}