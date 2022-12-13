import styles from '../../styles/components/main/Profile.module.scss';
import Button_Main from '../../components/buttons/Button_Main';
import { useEffect, useState } from 'react';
import { interview_icons, interview_colors } from '../../tools/global_variables';
import { IoIosAdd } from "react-icons/io";
import { close_application, view_application, shortlist_application, unselect_application } from '../../firebase/methods/Applicant_Functions';
import { Column, Row, RowSpaced, Table } from '../../tools/global_components';
import Portfolio_Entry from '../portfolio/Portfolio_Entry';
import Button_Outline from '../buttons/Button_Outline';
import Create_Interview from '../forms/Create_Interview';
import View_Interview from '../forms/View_Interview';
import Header_Modal from '../headers/Header_Modal';
import { applicant_status } from '../../tools/global_functions';
import Create_Offer from '../forms/Create_Offer';
import View_Contract from '../items/Contract';
import { cancel_interview } from '../../firebase/methods/Interview_Function';
import { unselect_applicant } from '../../firebase/methods/Post_Functions';
import { delete_employee } from '../../firebase/methods/Employee_Functions';

function Applicant (props) {
    const data = props.data;
    const job_data = props.job_data;
    const interviews = props.interviews;
    const position = props.position;
    const company = props.company;
    const nav = props.nav;
    const [selected, set_selected] = useState(nav ? 3 : 0);
    const [interview, set_interview] = useState(nav ? interviews.find(item => item.id === nav) : {});


    useEffect(() => {
        return () => { if(data.viewed === false) { view_application(data.application_id)} };
    }, []);


    const close_handler = async () => {
        if(data.selected) {
            unselect_applicant(job_data.post_id);
            unselect_application(data.application_id);
        }
        close_application(data.application_id);
        interviews.forEach(item => cancel_interview(item.id))
        set_selected(0)
    }


    const shortlist_handler = () => {
        shortlist_application(data.application_id);
    };

    const interview_item = (item) => {
        const handler = () => {
            set_interview(item);
            set_selected(3);
        }
        return (
            <div onClick={handler} className={styles.interviews__item} style={{backgroundColor: interview_colors[item.status]}}>
                {interview_icons[item.type]}
            </div>
        )
    };

    const interview_create = <div onClick={() => set_selected(4)} className={styles.interviews__create}><IoIosAdd /></div>;


    const main = (
            <main className={styles.right__wrapper}> 
                <Column gap={2}>
                    <Header_Modal name={applicant_status(data)}>Applicant</Header_Modal>
                    <Column gap={1}>
                        <h4>Professional Summary</h4>
                        <p>{data.user_data.summary}</p>
                    </Column>
                    <Column gap={1}>
                        <h4>Work Experience</h4>
                        {data.user_data.experience.map((item, index) => <Portfolio_Entry data={item} type={'experience'} />).reverse()}
                    </Column>
                    <Column gap={1}>
                        <h4>Education</h4>
                        {data.user_data.education.map((item, index) => <Portfolio_Entry data={item} type={'education'} />).reverse()}
                    </Column>

              
                </Column> 
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        <Button_Main width={20} action={props.close}>Back</Button_Main>
                        {
                            job_data.closed ? null :
                            data.selected ? <Button_Main action={() => set_selected(6)} width={20}>View Offer</Button_Main> :
                            data.shortlist && job_data.selected ? null :
                            data.shortlist ? <Button_Main action={() => set_selected(5)} width={20}>Make Offer</Button_Main> : 
                            <Button_Main width={20} action={shortlist_handler}>Shortlist</Button_Main>
                        }
                    </Row>
                </section>
            </main>
    );

    
    const close_form = (
        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                <Column gap={2}>
                    <Header_Modal>Close Application</Header_Modal>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus laoreet sem at efficitur. Phasellus ultrices quam non quam venenatis, pharetra imperdiet diam hendrerit.</small>
                </Column>
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        <Button_Main action={() => set_selected(0)} width={20}>Cancel</Button_Main>
                        <Button_Outline action={close_handler} height={4}>Confirm</Button_Outline>
                    </Row>
                </section>
            </div>
        </section>

    )

    const revoke_handler = () => {
        delete_employee(data.employee.employee_id)
        unselect_applicant(job_data.post_id);
        unselect_application(data.application_id);
    };

    const revoke_form = (
        <section className={styles.right__wrapper}>
            <Column gap={2}>
                <p>Are you sure you want to revoke this offer?</p>
        
            </Column>
            <div className={styles.right__actions}>
                 <Row gap={2}>
                    <Button_Outline height={4} action={() => set_selected(6)}>Cancel</Button_Outline>
                    <Button_Main action={revoke_handler} width={20}>Confirm</Button_Main>
                </Row>
             </div>
        </section>
    )

    const contract = (
        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                <Column gap={2}>
                    <Header_Modal>Contract Offer</Header_Modal>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus laoreet sem at efficitur. Phasellus ultrices quam non quam venenatis, pharetra imperdiet diam hendrerit.</small>
                    <View_Contract data={position} company={company} user_data={data.user_data} employee={data.employee} />
                </Column>
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        <Button_Outline height={4} action={() => set_selected(0)}>Back</Button_Outline>
                        <Button_Main action={() => set_selected(7)} width={20}>Revoke</Button_Main>
                    </Row>
                </section>
            </div>
        </section>
    );


    const content = [
        main, 
        main, 
        close_form, 
        <View_Interview close={() => set_selected(0)} data={interview} user_data={data.user_data} />, 
        <Create_Interview close={() => set_selected(0)} application_data={data} job_data={job_data} user_data={data.user_data} />,
        <Create_Offer close={() => set_selected(0)} application={data} data={position} company={company} user_data={data.user_data} />,
        contract, 
        revoke_form
    ];

    return (
        <main className={styles.main}>
            <section className={styles.left}>
                <div className={styles.avatar}>
                    <img src={data.user_data.avatar} />
                    <div>
                        <h4>{data.user_data.name}</h4>
                        <small>{position.title}</small>
                    </div>
                    <a className={styles.avatar__button} target="_blank" href={data.user_data.resume} download>View Resume</a>
                </div>

                <Table>
                    <p class="bold">Phone</p><p>{data.user_data.phone}</p>
                    <p class="bold">Email</p><p>anna@gmail.com</p>
                    <p class="bold">LinkedIn</p><p>{data.user_data.linkedin}</p>
                    <p class="bold">Website</p><p>{data.user_data.website}</p>
                    <p class="bold">Location</p><p>Kyiv, Ukraine</p>
                    <p class="bold">Apply Date</p><p>25/02/2022</p>
                </Table>

                {data.shortlist ? (
                    <div>
                        <h4>Interviews</h4>
                        <div className={styles.interviews}>
                            {interviews.map(item => interview_item(item))}
                            {job_data.closed ? null : interview_create}
                        </div>
                    </div>
                ) : null}

                <RowSpaced>
                    {job_data.closed ? null : <small style={{cursor: "pointer"}} class={selected === 2 ? "nav-active" : null} onClick={() => set_selected(2)}>Close Application</small>}
                </RowSpaced>

            </section>

                
            <section className={styles.right}>
                {content[selected]}   
            </section> 
      
        </main>
    )
}

export default Applicant;


