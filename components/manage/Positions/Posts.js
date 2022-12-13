import { useState } from 'react';
import styles from '../../../styles/components/main/Profile.module.scss';
import { calendar, time_since } from '../../../tools/DateTime_Methods';
import { Column, ColumnCentered, form_header, Grid, Line, Modal, Row, Table } from '../../../tools/global_components';
import moment  from 'moment';
import Header_Modal from '../../headers/Header_Modal';
import Button_Main from '../../buttons/Button_Main';
import Employee_Preview from './Employee';
import Recruitment_Preview from './Recruitment';
import { IoMdToday } from "react-icons/io";



function Position_Posts (props) {
    const [selected, set_selected] = useState(0);
    const [profile, set_profile] = useState(false);
    const data = props.data;

    console.log(data)



    const main = (
        <main className={styles.right__wrapper}>
            <Column gap={2}>
                <Header_Modal name={"History"}>Recruitment</Header_Modal>

                <Row gap={2}>
                    {data.recruitment.map(item => (
                        <div onClick={() => set_profile(item)} className={styles.avatar__outlined} style={{height: "22rem"}}>
                            <div className={styles.avatar__outlined__icon}><IoMdToday /></div>
                            <ColumnCentered>
                                <h4>{item.applicants.length} Applicants</h4>
                                <small>{calendar(item.timestamp)}</small>
                                <small>{item.close_date ? calendar(item.close_date) : "---"}</small>
                            </ColumnCentered>
                        </div> 
                    ))}
                </Row>
            </Column>
            <section className={styles.right__actions}>
                <Button_Main width={20} action={props.close}>Back</Button_Main>
            </section>
        </main>
    )

    return profile ? <Recruitment_Preview position={data} company={data.company} recruitment={profile} close={() => set_profile(false)} /> : main;
};

export default Position_Posts;


