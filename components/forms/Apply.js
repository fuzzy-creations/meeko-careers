import styles from '../../styles/components/main/Profile.module.scss';
import Button_Main from '../buttons/Button_Main';
import Text_Input from '../inputs/Text_Input';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { get_resume, upload_resume } from '../../firebase/methods/Storage_Functions';
import { update_my_profile } from '../../firebase/methods/User_Functions';
import Upload_Resume from '../portfolio/Upload_Resume';
import { interview_types, job_categories, job_hours, job_remote, management } from '../../tools/global_variables';
import { create_application } from '../../firebase/methods/Applicant_Functions';
import generatePushID from '../../tools/IDGenerator';
import { Column, Grid, Highlight, Row, Table } from '../../tools/global_components';
import Portfolio_Entry from '../portfolio/Portfolio_Entry';
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { MdWebAsset } from "react-icons/md";
import { BsChevronLeft, BsChevronRight, BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { Link, useHistory } from 'react-router-dom';
import { FiMail } from "react-icons/fi";
import Header_Modal from '../headers/Header_Modal';
import { IoIosPhonePortrait } from "react-icons/io";

function Apply (props) {
    const data = props.data;
    const { user_data } = useContext(AuthContext);
    const [resume, set_resume] = useState(user_data.resume);
    const [email, set_email] = useState(user_data.email);
    const [phone, set_phone] = useState(user_data.phone);
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");
    const [applied, set_applied] = useState(props.applied);
    const history = useHistory();



    const upload_resume_handler = async (file) => {
        try {
            await upload_resume(file, user_data.id);
            const data = await get_resume(user_data.id);
            update_my_profile(user_data.id, {resume: data});
            set_resume(data);
            return true;
        } catch(error) {
            alert("Error uploading resume");
            return false;
        }
    };


    const apply_handler = async () => {
        const application_id = generatePushID();
        set_loader(true);
        try {
            create_application(application_id, data.post_id, data.position_id, data.company_id, user_data.id, {email: email, phone: phone});
            set_loader(false);
            set_applied(true)
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    }


    return (
        
            <main className={styles.main}>
                <Column gap={2}>
                    <div className={styles.avatar}>
                        <img src={user_data.avatar} />
                        <div>
                            <h4>{user_data.name}</h4>
                            <small>{user_data.title}</small>
                        </div>
                        {!resume ? <Upload_Resume file={upload_resume_handler} /> : <a className={styles.avatar__button} target="_blank" href={resume} download>View Resume</a>}
                    </div>
                    <Column gap={0.5} fixed={true}>
                        <h4>About the job</h4>
                        <small>{data.about}</small>
                    </Column>

                    <Column gap={0.5} fixed={true}>
                        <h4>Minimum qualifications:</h4>
                            <Row gap={0.5}>
                                {data.min_skills.map(item => <Highlight>{item}</Highlight>)}
                            </Row>
                    </Column>
                    <Column gap={0.5} fixed={true}>
                        <h4>Preferred qualifications:</h4>
                            <Row gap={0.5}>
                                {data.pref_skills.map(item => <Highlight>{item}</Highlight>)}
                            </Row>
                    </Column>
                    <Column gap={0.5} fixed={true}>
                        <h4>Additional Information</h4>
                        <small>{data.info}</small>
                    </Column>
                </Column>
                <section className={styles.right}>
                    <section className={styles.right__wrapper}>
                        <Column gap={3}>
                            <Header_Modal name={job_categories[data.category]}>{data.position.title}</Header_Modal>
                            <ul className={styles.list}>
                                    <p><FiCreditCard/>{data.position.salary}k <small>/ year</small></p>
                                    <p><FiBriefcase/>{data.position.hours.length} <small>/ week</small></p>
                                    <p><GoLocation />{management[data.position.type]}</p>
                            </ul>
                            <Column gap={0.5} fixed={true}>
                                <h4>Professional Summary</h4>
                                <small>{user_data.summary}</small>
                            </Column>
                            <Column gap={0.5} fixed={true}>
                                <h4>Work Experience</h4>
                                {user_data.experience.map((item, index) => <Portfolio_Entry data={item} type={'experience'} />).reverse()}
                            </Column>
                            <Column gap={0.5} fixed={true}>
                                <h4>Education</h4>
                                {user_data.education.map((item, index) => <Portfolio_Entry data={item} type={'education'} />).reverse()}
                            </Column>
                            <Column gap={0.5} fixed={true}>
                                <h4>Contact</h4>
                                <Row gap={3}>
                                    <Row gap={1}>
                                        <div className={styles.icons}><IoIosPhonePortrait /></div>
                                        <small>{user_data.phone}</small>
                                    </Row>
                                    <Row gap={1}>
                                        <div className={styles.icons}><FiMail /></div>
                                        <small>{user_data.email}</small>
                                    </Row>
                                    <Row gap={1}>
                                        <div className={styles.icons}><FaLinkedin /></div>
                                        <small>{user_data.linkedin}</small>
                                    </Row>
                                    <Row gap={1}>
                                        <div className={styles.icons}><MdWebAsset /></div>
                                        <small>{user_data.website}</small>
                                    </Row>
                                    
                                </Row>
                            </Column>

                            <small>{status}</small>
                        </Column>
                        <section className={styles.right__actions}>
                            {applied ? <Button_Main loader={loader} width={20} action={() => history.push('/dashboard/applications')}>View Application</Button_Main> : (
                                resume ? 
                                    <Button_Main loader={loader} width={20} active={resume && email} action={apply_handler}>Apply now</Button_Main> 
                                    : 
                                    <Upload_Resume file={upload_resume_handler} />
                                )}
                        </section>
                    </section>
                </section>


            </main>
    )
}

export default Apply;


// {applied ? ( 
//     <Row gap={3} marginTop={1}>
//         <p>{user_data.phone}</p>
//     </Row>
// ) : (
//     <Row gap={3} marginTop={1}>
//         <Text_Input value={phone} input={set_phone}>Phone Number</Text_Input>
//     </Row>
// ) }