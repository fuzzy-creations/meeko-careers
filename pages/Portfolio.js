import styles from '../styles/pages/Portfolio.module.scss';
import { FaLinkedin } from "react-icons/fa";
import { MdWebAsset, MdLocationOn } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { IoIosPhonePortrait } from "react-icons/io";
import Edit_Icon from '../components/items/Edit_Icon';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import Edit_Input from '../components/items/Edit_Input';
import { update_my_profile } from '../firebase/methods/User_Functions';
import Button_Main from '../components/buttons/Button_Main';
import { upload_avatar, get_avatar, upload_resume, get_resume } from '../firebase/methods/Storage_Functions';
import Portfolio_Add_Entry from '../components/portfolio/Portfolio_Add_Entry';
import Portfolio_Entry from '../components/portfolio/Portfolio_Entry';
import Portfolio_Edit_Summary from '../components/portfolio/Portfolio_Edit_Summary';
import Upload_Image from '../components/portfolio/Upload_Image';
import Upload_Resume from '../components/portfolio/Upload_Resume';
import Text_Input from '../components/inputs/Text_Input';
import { Column, Row } from '../tools/global_components';


function Portfolio (props) {
    const user_data = props.user_data;
    const [edit_profile, set_edit_profile] = useState(false);
    const [edit_summary, set_edit_summary] = useState(false);
    const [edit_experience, set_edit_experience] = useState(false);
    const [edit_education, set_edit_education] = useState(false);
    const [user_info, set_user_info] = useState(props.user_data);
    const [avatar, set_avatar] = useState(props.user_data.avatar);
    const [preview, set_preview] = useState(props.user_data.avatar);
    const [title, set_title] = useState(props.user_data.title);
    const [email, set_email] = useState(props.user_data.email);
    const [phone, set_phone] = useState(props.user_data.phone);
    const [linkedin, set_linkedin] = useState(props.user_data.linkedin);
    const [website, set_website] = useState(props.user_data.website);
    const [location, set_location] = useState(props.user_data.location);
    const [resume, set_resume] = useState(props.user_data.resume);

    const upload_handler = async () => {
        await upload_avatar(avatar, user_data.id);
        return await get_avatar(user_data.id);
    };

    const upload_resume_handler = async (file) => {
        await upload_resume(resume, user_data.id);
        const data = await get_resume(user_data.id);
        set_resume(data);
        return data;
    };

console.log(resume)

    const save_profile = async () => {
        const resume_data = resume !== user_data.resume ? await upload_resume_handler() : resume;
        const avatar_data = avatar !== user_data.avatar ? await upload_handler() : avatar;
        update_my_profile(user_data.id, {title: title, email: email, phone: phone, linkedin: linkedin, website: website, location: location, avatar: avatar_data, resume: resume_data})
    };
    const save_summary = (data) => update_my_profile(user_data.id, {summary: data});
    const save_experience = (data) => update_my_profile(user_data.id, {experience: [...user_info.experience, data]});
    const save_education = (data) => update_my_profile(user_data.id, {education: [...user_info.education, data]});


    return (
        <main className={styles.portfolio}>

            <section className={styles.profile}>

                <div className={styles.profile__user}>
                    <div className={styles.profile__user__edit}><Edit_Icon value={edit_profile} toggle={set_edit_profile} /></div>
                    {edit_profile ?  <Upload_Image value={preview} preview={(e) => set_preview(e)} file={set_avatar} /> : <img className={styles.profile__avatar} src={preview} />} 
                    <h4>{user_info.name}</h4>
                    {edit_profile ? <Upload_Resume file={set_resume} /> : user_data.resume ? <a className={styles.profile__download} href={resume} target="_blank"  download><small>View Resume</small></a> : null}
                </div>

                
                <div className={styles.profile__details}>
                    <p><FiMail /> {user_data.email}</p>
                    {edit_profile || phone ? <p> <IoIosPhonePortrait /> {edit_profile ? <Text_Input placeholder={"Add Phone"} value={phone} input={set_phone}></Text_Input> : user_data.phone || "Add Phone Number" }</p> : null}
                    {edit_profile || linkedin ? <p><FaLinkedin /> {edit_profile ? <Text_Input placeholder={"Add LinkedIn"} value={linkedin} input={set_linkedin}></Text_Input> : user_data.linkedin }</p> : null}
                    {edit_profile || website ? <p><MdWebAsset /> {edit_profile ? <Text_Input placeholder={"Add Website"} value={website} input={set_website}></Text_Input> : user_data.website || "Add website" }</p> : null}
                    {edit_profile || location ? <p><MdLocationOn /> {edit_profile ? <Text_Input placeholder={"Add Location"} value={location} input={set_location}></Text_Input> : user_data.location || "Add Location" }</p> : null}
                </div>

                {edit_profile ? <div className={styles.profile__action}><Button_Main action={() => {save_profile(); set_edit_profile(false)}}>Save</Button_Main></div> : null}
            </section>



            <section className={styles.resume}>
                <div className={`${styles.wrapper} ${styles.wrapper__primary}`}>
                    <Row gap={1}>
                        <h4>Professional Summary</h4>
                        <h4><Edit_Icon value={edit_summary} toggle={set_edit_summary} /></h4>
                    </Row>
                    {edit_summary ? <Portfolio_Edit_Summary close={set_edit_summary} save={save_summary} value={user_info} input={set_user_info}  /> : user_info.summary.length === 0 ? <p>Use this space to fill out your professional portfolio and tell us about yourself.</p> : <p>{user_info.summary}</p>}
                </div>
                <div className={styles.wrapper}>
                    <Row gap={1}>
                        <h4>Work Experience</h4>
                        <h4><Edit_Icon value={edit_experience} toggle={set_edit_experience} /></h4>
                    </Row>
                    {edit_experience ? <Portfolio_Add_Entry save={save_experience} value={user_info} input={set_user_info} type={'experience'} /> : null}
                    {user_info.experience.length === 0 && !edit_experience? <small>Add your work experience.</small> : null}
                    {user_info.experience.map((item, index) => <Portfolio_Entry user_id={user_data.id} value={user_info} index={index} input={set_user_info} allow_delete={edit_experience} data={item} type={'experience'} />).reverse()}
                </div>
                <div className={styles.wrapper}>
                    <Row gap={1}>
                        <h4>Education</h4>
                        <h4><Edit_Icon value={edit_education} toggle={set_edit_education} /></h4>
                    </Row>
                    {edit_education ? <Portfolio_Add_Entry save={save_education} value={user_info} input={set_user_info} type={'education'} /> : null}
                    {user_info.education.length === 0 && !edit_education ? <small>Add your educational history.</small> : null}
                    {user_info.education.map((item, index) => <Portfolio_Entry user_id={user_data.id} value={user_info} index={index} input={set_user_info} allow_delete={edit_education} data={item} type={'education'} />).reverse()}
                </div>
            </section>

        </main>
    );
};

export default Portfolio;