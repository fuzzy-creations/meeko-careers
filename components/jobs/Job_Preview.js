import styles from '../../styles/components/jobs/Job_Preview.module.scss';
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import { FaSortDown, FaSortUp  } from "react-icons/fa";
import { IoMdToday } from "react-icons/io";
import Button_Main from '../buttons/Button_Main';
import { useContext, useEffect, useState } from 'react';
import { job_categories, job_hours, job_remote, management } from '../../tools/global_variables';
import Apply from '../forms/Apply';
import { AuthContext } from '../../contexts/Auth.context';
import Modal from '../UI/Modal';
import { Highlight, Row } from '../../tools/global_components';
import Button_Outline from '../buttons/Button_Outline';

function Job_Preview (props) {
    const { user, set_login_open } = useContext(AuthContext);
    const [expand, set_expand] = useState(false);
    const [apply_open, set_apply_open] = useState(false);
    const data = props.data;

    useEffect(() => {
        set_expand(false)
    }, [data])

    const open_handler = (data) => {
        set_apply_open(true);
        document.body.style.overflow = "hidden";
    };
     
    return (
        <>
        <div className={styles.preview}>
            <div className={styles.container}>

                    <div className={`${styles.details} ${styles.wrapper}`}>
                        <div className={styles.details__image}><IoMdToday /></div>
                        <small>{job_categories[data.category]}</small>
                        <h3>{data.position.title}</h3>
                        <ul className={styles.details__list}>
                            <p><FiCreditCard/> {data.position.salary}k <small>/ year</small></p>
                            <p><FiBriefcase/> {data.position.hours.length} <small>/ week</small></p>
                            <p><GoLocation /> {management[data.position.type]}</p>
                        </ul>
                    </div>
                    <div className={expand ? styles.wrapper : null}>
                        <h4>About the job</h4>
                        <small>{data.about}</small>
                    </div>
                    {expand ? (
                        <>
                    <div className={styles.wrapper}>
                        <h4>Minimum qualifications:</h4>
                        <Row gap={0.5}>
                            {data.min_skills.map(item => <Highlight>{item}</Highlight>)}
                        </Row>
                    </div>
                    <div className={styles.wrapper}>
                        <h4>Preferred qualifications:</h4>
                        <Row gap={0.5}>
                            {data.pref_skills.map(item => <Highlight>{item}</Highlight>)}
                        </Row>
                    </div>
                    <div>
                        <h4>Additional Information</h4>
                        <small>{data.info}</small>
                    </div>
                    </>) : null}
                    <small className={styles.expand} style={expand ? {alignItems: "flex-end"} : {alignItems: "flex-start"}} onClick={() => set_expand(!expand)}>{expand ? `Read Less` : `Read More`} {expand ? <FaSortUp /> : <FaSortDown />}</small>
                    <div className={styles.action}>
                    {user ? (props.applied ? <Button_Outline full={true} height={4} action={open_handler} hollow={true}>Applied</Button_Outline> : <Button_Main action={open_handler}>Apply</Button_Main>) : <Button_Main action={() => set_login_open(true)}>Apply</Button_Main>}
                    </div>
                </div>
            </div>
            {apply_open ? <Modal close={() => set_apply_open(false)} ><Apply applied={props.applied} data={data}/></Modal> : null}
        </>
    )
};

export default Job_Preview;