import { useState } from 'react';
import styles from '../../../styles/components/main/Profile.module.scss';
import { calendar, calendar__text, get_date, time_since } from '../../../tools/DateTime_Methods';
import { Column, ColumnCentered, ColumnSpaced, form_header, Grid, Line, Modal, Row, RowSpaced, Table } from '../../../tools/global_components';
import Button_Main from '../../buttons/Button_Main';
import { close_post, delete_post, pause_post, unpause_post } from '../../../firebase/methods/Post_Functions';
import { vacate_position } from '../../../firebase/methods/Position_Functions';
import Applicant_Preview from '../../previews/Applicant_Preview';
import Header_Modal from '../../headers/Header_Modal';
import Textarea_Input from '../../inputs/Textarea_Input';
import Requirements from '../../inputs/Requirements';
import Button_Outline from '../../buttons/Button_Outline';
import Interview_Preview from '../../previews/Interview_Preview';
import Card_Small from '../../items/Card_Small';


function Recruitment_Preview (props) {
    const data = props.data;
    const position = props.position;
    const company = props.company;
    const recruitment = props.recruitment;

    const [selected, set_selected] = useState(0);
    const [about, set_about] = useState(recruitment.about);
    const [min_skills, set_min_skills] = useState(recruitment.min_skills);
    const [pref_skills, set_pref_skills] = useState(recruitment.pref_skills);
    const [info, set_info] = useState(recruitment.info);




    const interviews_pending = recruitment.interviews.filter(item => item.status === 1)
    const interviews_cancelled = recruitment.interviews.filter(item => item.status === 0)
    const interviews_upcoming = recruitment.interviews.filter(item => item.status === 2)
    const interviews_past = recruitment.interviews.filter(item => item.status === 3)

    const offer = recruitment.selected ? recruitment.applicants.find(item => item.selected) : false;

    console.log(recruitment)

    console.log(props)


    const delete_handler = () => {
        close_post(recruitment.post_id);
        vacate_position(position.id);
    }

    const pause_handler = () => { pause_post(recruitment.post_id) };
    const unpause_handler = () => { unpause_post(recruitment.post_id) };

    console.log(offer)


    const applicants = (
        <Column fixed={true} gap={1}>
            <h4 class="medium">{recruitment.applicants.filter(item => !item.closed).length} Results</h4>
            <Grid columns={"1fr 1fr"} gap={3}>
                {recruitment.applicants.filter(item => !item.closed).map(item => 
                    <Applicant_Preview 
                        data={item} 
                        position={position} 
                        company={company} 
                        interviews={recruitment.interviews.filter(interview => interview.application_id === item.application_id)} 
                        job_data={recruitment}  
                    />)}
            </Grid>
        </Column>
    );

    const rejected = (
        <Column fixed={true} gap={1}>
            <h4 class="medium">{recruitment.applicants.filter(item => item.closed).length} Results</h4>
            <Grid columns={"1fr 1fr"} gap={3}>
                {recruitment.applicants.filter(item => item.closed).map(item => 
                    <Applicant_Preview 
                        data={item} 
                        position={position} 
                        company={company} 
                        interviews={recruitment.interviews.filter(interview => interview.application_id === item.application_id)} 
                        job_data={recruitment}  
                    />)}
            </Grid>
        </Column>
    );

    const shortlist = (
        <Column fixed={true} gap={1}>
            <h4 class="medium">{recruitment.applicants.filter(item => item.shortlist === true).length} Results</h4>
            <Grid columns={"1fr 1fr"} gap={3}>
                {recruitment.applicants.filter(item => item.shortlist === true).map(item => <Applicant_Preview data={item} position={position} company={company} interviews={recruitment.interviews} job_data={recruitment}  />)}
            </Grid>
        </Column>
    );

    const interviews = (
        <Column fixed={true} gap={3}>
            
            {interviews_upcoming.length == 0 ? null : (
                <Column gap={1}>
                    <h4 class="medium">{interviews_upcoming.length} Upcoming</h4>
                    {interviews_upcoming.map(item => {
                        const application = recruitment.applicants.find(obj => obj.application_id === item.application_id);      
                        return <Interview_Preview data={item} large={true}  application={application} user_data={application.user_data} interviews={recruitment.interviews.filter(obj => obj.application_id === item.application_id )}  company={company}   position={position}   post={recruitment} embedded={true} />
                        }
                    )}
                </Column>
            )}
            {interviews_past.length == 0 ? null : (
                <Column gap={1}>
                    <h4 class="medium">{interviews_past.length} Past</h4>
                    {interviews_past.map(item => {
                        const application = recruitment.applicants.find(obj => obj.application_id === item.application_id);      
                        return <Interview_Preview data={item} large={true}  application={application} user_data={application.user_data} interviews={recruitment.interviews.filter(obj => obj.application_id === item.application_id )}  company={company}   position={position}   post={recruitment} embedded={true} />
                        }
                    )}
                </Column>
            )}
            {interviews_pending.length == 0 ? null : (
                <Column gap={1}>
                    <h4 class="medium">{interviews_pending.length} Pending</h4>
                    {interviews_pending.map(item => {
                        const application = recruitment.applicants.find(obj => obj.application_id === item.application_id);      
                        return <Interview_Preview data={item} large={true}  application={application} user_data={application.user_data} interviews={recruitment.interviews.filter(obj => obj.application_id === item.application_id )}  company={company}   position={position}   post={recruitment} embedded={true} />
                        }
                    )}
                </Column>
            )}
            {interviews_cancelled.length == 0 ? null : (
                <Column gap={1}>
                    <h4 class="medium">{interviews_cancelled.length} Cancelled</h4>
                    {interviews_cancelled.map(item => {
                        const application = recruitment.applicants.find(obj => obj.application_id === item.application_id);      
                        return <Interview_Preview data={item} large={true}  application={application} user_data={application.user_data} interviews={recruitment.interviews.filter(obj => obj.application_id === item.application_id )}  company={company}   position={position}   post={recruitment} embedded={true} />
                        }
                    )}
                </Column>
            )}


        </Column>
    );

    const edit = (
        <Column gap={2}>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus mi. Duis venenatis porta magna id malesuada. In ac urna a libero aliquet vestibulum. Integer sed lacus et urna tincidunt imperdiet. </small>
            {form_header("About", "Fill in the required information about the job.")}
            <Textarea_Input value={about} input={set_about}>About the job</Textarea_Input>
            {form_header("Minimum Requirements", "Fill in the minimum requirements.")}
            <Requirements value={min_skills} input={set_min_skills}>Minimum requirements</Requirements>
            {form_header("Preffered Requirements", "Fill in the preffered requirements.")}
            <Requirements value={pref_skills} input={set_pref_skills}>Preffered requirements</Requirements>
            {form_header("Additional Requirements", "Fill in any additional information.")}
            <Textarea_Input value={info} input={set_info}>Additional Information</Textarea_Input>
        </Column>
    );

    const close_form = (
        <Column gap={2}>
            <h4>Close Post</h4>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus mi. Duis venenatis porta magna id malesuada. In ac urna a libero aliquet vestibulum. Integer sed lacus et urna tincidunt imperdiet.</small>
        </Column>
    );

    const actions = [
        <Row gap={2}>
            {props.close ? <Button_Main width={20} action={props.close}>Back</Button_Main> : null}
            {recruitment.closed ? null : recruitment.paused ? <Button_Outline action={unpause_handler} height={4}>Unpause</Button_Outline> : <Button_Outline action={pause_handler} height={4}>Pause</Button_Outline>}
        </Row>, 
        null, 
        null, 
        null, 
        <Row gap={2}><Button_Main width={20}>Save</Button_Main>{recruitment.closed ? null : <Button_Outline action={() => set_selected(5)} height={4}>Close Post</Button_Outline>}</Row>,
        <Row gap={2}><Button_Outline action={() => set_selected(0)} height={4}>Cancel</Button_Outline><Button_Main action={delete_handler} width={20}>Confirm</Button_Main></Row>,
    ];
    
    const content = [applicants, shortlist, interviews, rejected, edit, close_form];
    const menu = ["Applicants", "Shortlist", "Interviews", "Rejected", "Edit", ]

    return (
        <main className={styles.right__wrapper}>
            <Column gap={2}>
                <RowSpaced>
                    <Header_Modal name={recruitment.closed ? "Closed" : recruitment.paused ? "Paused" : "Open"}>Recruitment</Header_Modal>
                    <Row gap={1.5}>
                        {menu.map((item, index) => <div className={selected === index ? styles.profile_nav__selected : styles.profile_nav} onClick={() => set_selected(index)}><small>{item}</small></div>)}
                    </Row>
                </RowSpaced>
                <RowSpaced gap={0} nowrap={true}>
                    <Card_Small icon={0} name={"Open Date"}>{calendar(recruitment.timestamp)}</Card_Small>
                    <Card_Small icon={1} name={"Closed Date"}>{recruitment.closed_date ? calendar(recruitment.closed_date) : "---"}</Card_Small>
                    <Card_Small icon={2} name={"Duration"}>---</Card_Small>
                    <Card_Small icon={3} name={"Manager"}>{recruitment.manager.name}</Card_Small>
                </RowSpaced>
                {content[selected]}
            </Column>
            <section className={styles.right__actions}>
                {actions[selected]}
            </section>
        </main>
    )
};

export default Recruitment_Preview;


