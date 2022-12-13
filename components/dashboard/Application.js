import React, { useContext, useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import { interview_colors, interview_duration, interview_types, job_categories, management } from '../../tools/global_variables';
import Click_Modal from '../../components/items/Click_Modal';

import { Column, ColumnSpaced, Table, Row, RowSpaced, Grid } from '../../tools/global_components';
import { get_day, get_time } from '../../tools/DateTime_Methods';
import { AuthContext } from '../../contexts/Auth.context';
import { IoMdToday } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoAlertSharp, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";


import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import Button_Outline from '../buttons/Button_Outline';
import Header_Modal from '../headers/Header_Modal';
import { applicantion_status, applicant_status } from '../../tools/global_functions';
import Applicant_Interview from '../forms/Applicant_Interview';
import Button_Main from '../buttons/Button_Main';
import View_Offer from '../forms/View_Offer';
import View_Contract from '../items/Contract';
import Application_Step from '../items/Application_Step';
import { close_post } from '../../firebase/methods/Post_Functions';
import { accept_employee } from '../../firebase/methods/Employee_Functions';
import { fill_position } from '../../firebase/methods/Position_Functions';
import { useHistory } from 'react-router-dom';

function Application (props) {
    const { user_data } = useContext(AuthContext);
    const data = props.data;
    const interviews = props.interviews;
    const nav = props.nav;
    const [selected, set_selected] = useState(0);
    const [open_interview, set_open_interview] = useState(nav ? true : false);
    const [interview, set_interview] = useState(nav ? interviews.find(item => item.id === nav) : {});
    const history = useHistory();

    console.log(props)
    
    
    
    
    const interview_item = (item) => {
        
        const style = [styles.applicant_calender__red, styles.applicant_calender__primary, styles.applicant_calender__blue, styles.applicant_calender__green];
        const status = ["Cancelled", "Action Required", get_time(item.time), "Complete"];
        const icons = [
            <span className={`${styles.calender__icon} ${styles.calender__red}`}><IoCloseSharp /></span>,
            <span className={`${styles.calender__icon} ${styles.calender__alert}`}><IoAlertSharp /></span>, 
            <p>{get_day(item.time)}</p>, 
            <span className={`${styles.calender__icon} ${styles.calender__check}`}><IoCheckmarkSharp /></span>
        ];
        const handler = () => {
            set_interview(item);
            set_open_interview(true);
        }

        return (
            <div className={`${styles.applicant_calender} ${style[item.status]}`} onClick={handler}>
                <div className={styles.calender__date} style={{border: `2px solid ${interview_colors[item.status]}`}}>{icons[item.status]}</div>
                <div className={styles.calender__content}>
                    <p>{interview_types[item.type]}</p>
                    <small>{interview_duration[item.duration]}</small>
                </div>
                <div className={styles.calender__time}>
                    <MdLocationOn />
                    <p>{status[item.status]}</p>
                </div>
            </div>
        );
    };

    const status = applicantion_status(data, true);

    const status_handler = (num, active) => {
        if(data.job_data.selected && data.closed && data.selected) return 3
        if(active === false) return 0;
        if(status === num && data.closed) return 1;
        if(status === num && !data.closed) return 2;
        if(num < status) return 3;
    };


    const sign_handler = () => {

        close_post(data.job_data.post_id);
        accept_employee(data.employee.employee_id)
        fill_position(data.position.id, data.employee.employee_id);
        history.push("/dashboard")
    }


    const first_details = (
        <>
        <div>
            <h4>About the job</h4>
            <small>{data.job_data.about}</small>
        </div>

        <div>
            <h4>Minimum qualifications:</h4>
                <Column>
                    {data.job_data.min_skills.map(item => <small>- {item}</small>)}
                </Column>
        </div>
        <div>
            <h4>Preferred qualifications:</h4>
                <Column>
                    {data.job_data.pref_skills.map(item => <small>- {item}</small>)}
                </Column>
        </div>
        <div>
            <h4>Additional Information</h4>
            <small>{data.job_data.info}</small>
        </div>
        </>
    );

    const second_details = (
        <Table>
            <p class="bold">Salary</p><p>5k</p>
            <p class="bold">Management</p><p>Onsite</p>
            <p class="bold">Bonus</p><p>500</p>
            <p class="bold">Probation</p><p>Yes</p>
            <p class="bold">Duration</p><p>6 months</p>
            <p class="bold">Working hours</p><p>40</p>
            <p class="bold">Health Insurance</p><p>Yes</p>
            <p class="bold">Annual Leave</p><p>11</p>
            <p class="bold">Sick Leave</p><p>0</p>
        </Table>
    );

    const first_content = (
        <section className={styles.right__wrapper}>
            <Column gap={2}>
                <Header_Modal name={applicant_status(data)}>Application</Header_Modal>
                
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae quam tortor. Nulla facilisi. Etiam placerat nulla velit, eget imperdiet libero pellentesque vel.</small>
                <Row nowrap={true} gap={0.5}>
                    <Application_Step delay={"0s"} status={status_handler(0, true)} name={"Applied"} />
                    <Application_Step delay={"0.2s"} status={status_handler(1, data.viewed)} name={"In Review"} />
                    <Application_Step delay={"0.4s"} status={status_handler(2, data.shortlist)} name={"Shortlisted"} />
                    <Application_Step delay={"0.6s"} status={status_handler(3, data.interviewed)} name={"Interviews"} />
                    <Application_Step delay={"0.8s"} status={status_handler(4, data.selected)} name={"Selected"} />
                </Row>

                <Grid marginTop={5} columns={"1fr 1fr"} gap={5}>
                    <Column gap={5}>
                        <Column gap={1}>
                            <h4>Message</h4>
                            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a risus non nisl finibus aliquam sit amet et lorem. Nam vestibulum auctor lacus, id finibus libero vulputate id. Nullam finibus dui luctus, aliquam sapien at, vulputate lectus. Nulla ac risus in justo ornare dignissim. Sed in eros vitae massa tincidunt tempor ac et metus.</small>
                        </Column>
                        <Column gap={1}>
                            <h4>Details</h4>
                            <Table>
                                <p class="bold">Apply Date</p><p>25/02/2022</p>
                                <p class="bold">Hiring Manager</p><p>Anna Taylor</p>
                            </Table>
                        </Column>
                    </Column>
                    <div className={styles.block_alt}>
                        <h4>Interviews</h4>
                        {interviews.length === 0 ? <small>You've not been invited for any interviews yet but when you do they'll be here.</small> : interviews.map(item => <Click_Modal content={interview_item(item)}><Applicant_Interview data={item} /></Click_Modal>)}  
                    </div>
                </Grid>    
            </Column>

            <section className={styles.right__actions}>
                <Row gap={2}>
                    <Button_Main action={props.close} width={20}>Close</Button_Main>
                    {data.selected && !data.closed ? <Button_Main action={() => set_selected(1)} width={20}>View Offer</Button_Main> : null}
                </Row>
            </section>
        </section>
    );

    const second_content = (
        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                <Column gap={3}>
                    <Header_Modal>Contract Offer</Header_Modal>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus laoreet sem at efficitur. Phasellus ultrices quam non quam venenatis, pharetra imperdiet diam hendrerit.</small>
                    <View_Contract data={data.position} company={data.company} user_data={user_data} employee={data.employee} />
                </Column>
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        <Row gap={2}> <Button_Outline action={() => set_selected(0)} height={4}>Back</Button_Outline>
                        <Button_Main action={sign_handler} width={20}>Sign</Button_Main></Row>
                    </Row>
                </section>
            </div>
        </section>
    );

    const details = [first_details, second_details];
    const content = [open_interview ? <Applicant_Interview closed={data.closed} data={interview} close={() => set_open_interview(false)} /> : first_content, second_content];

    const _main = (
        <main className={styles.main}>
            <section className={styles.left}>
                <div className={styles.avatar}>
                    <div className={styles.avatar__icon}><IoMdToday /></div>
                    <div>
                        <small>{job_categories[data.job_data.category]}</small>
                        <h4>{data.position.title}</h4>
                    </div>
                    <ul className={styles.list}>
                        <p><FiCreditCard/> {data.position.salary}k</p>
                        <p><FiBriefcase/> {data.position.hours.length}</p>
                        <p><GoLocation /> {management[data.position.type]}</p>
                    </ul>
                </div>
                {details[selected]}
                
                {/* 
                <RowSpaced>
                    <small style={{cursor: "pointer"}} class={selected === 2 ? "nav-active" : null} onClick={() => set_selected(2)}>Delete Application</small>
                </RowSpaced> */}

            </section>

            <section className={styles.right}>
                {content[selected]}
            </section>


        </main>
    )

    return _main
}

export default Application;