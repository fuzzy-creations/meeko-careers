import React from 'react';
import styles from '../../styles/components/main/Preview.module.scss';
import { get_day, get_time, get_month } from '../../tools/DateTime_Methods';
import { Column, Row } from '../../tools/global_components';
import Click_Modal from '../items/Click_Modal';
import Applicant from '../manage/Applicant';
import { MdLocationOn } from "react-icons/md";
import { IoCheckmarkSharp, IoReaderOutline } from "react-icons/io5";
import { applicant_interview_status, interview_colors, interview_duration, interview_icons, interview_status, interview_types } from '../../tools/global_variables';
import Application from '../dashboard/Application';


function Interview_Preview (props) {
    const data = props.data;
    const post = props.post;
    const interviews = props.interviews;
    const user_data = props.user_data;
    const application = props.application;
    const position = props.position;
    const company = props.company;

    const icons = [
        <p>C</p>, 
        <p>P</p>, 
        <p>{get_day(data.time)}</p>, 
        <span className={styles.calender__check}><IoCheckmarkSharp /></span>
    ];
    
    const status = ["Cancelled", "Pending", get_time(data.time), "Complete"];
    const applicant_status = ["Cancelled", "Pending", get_time(data.time), "Complete"];


    const preview = ( 
        <div className={styles.calender}>
            <div className={styles.calender__date}>{icons[data.status]}</div>
            <div className={styles.calender__content}>
                <p>{props.applicant ? interview_types[data.type] : user_data.name}</p>
                <small>{props.applicant ? interview_duration[data.duration] : interview_types[data.type]}</small>
            </div>
            <div className={styles.calender__time}>
                <MdLocationOn />
                <p>{props.applicant ? applicant_status[data.status] : status[data.status]}</p>
            </div>
        </div>
    );

    const interview = ( 
        <section className={styles.interview} style={{borderLeft: `1rem solid ${interview_colors[data.status]}`}}>
            <div className={styles.interview__date}>
                <h4>{get_day(data.time)}</h4>
                <small>{get_month(data.time)}</small>
                <small>{get_time(data.time)}</small>
            </div>
            <Row gap={2}>
                <img className={styles.interview__avatar} src={user_data.avatar} />
                <Column gap={0.5} fixed={true}>
                    <h4>{user_data.name}</h4>
                    <Row gap={0.5}>
                        {interview_icons[data.type]}  
                        <small>{interview_types[data.type]}</small>
                    </Row>
                </Column>
            </Row>
            <Column gap={0.5} fixed={true}>
                <h4 class="bold">{interview_duration[data.duration]}</h4>
                <small style={{color: interview_colors[data.status]}}>{props.applicant ? applicant_interview_status[data.status] : interview_status[data.status]}</small>
            </Column>
            <Row>
                <IoReaderOutline />
            </Row>
        </section>
    );

    return (
        <Click_Modal custom={true} embedded={props.embedded} content={props.large ? interview : preview}>
            { props.applicant ? <Application data={application} interviews={interviews} nav={data.id} /> : <Applicant data={{...application, user_data: user_data}} company={company} position={position} job_data={post} interviews={interviews} nav={data.id} /> }
        </Click_Modal>
    )
};


export default Interview_Preview;