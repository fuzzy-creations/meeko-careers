import { useState, useEffect } from 'react';
import styles from '../../../styles/components/main/Profile.module.scss';
import { Column, form_header, form_select, form_selectable, Line, Modal, Row, Table } from '../../../tools/global_components';
import Button_Main from '../../buttons/Button_Main';
import Add_Employee from '../../dashboard/Add_Employee';
import Create_Employee from '../../forms/Create_Employee';
import Create_Post from '../../forms/Create_Post';
import { get_users } from '../../../firebase/methods/User_Functions';
import Header_Modal from '../../headers/Header_Modal';



function Vacant_Preview (props) {
    const data = props.data;
    const [selected, set_selected] = useState(0);
    const [user_data, set_user_data] = useState([]);
    const [all_users, set_all_users] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            const u = await get_users();
            set_all_users(u);
        }
        fetch_data();
    }, [])


    const standard = ( 
        <main className={styles.right__wrapper}>
            <Column gap={2} fixed={true}>
                <Header_Modal>Fill Position</Header_Modal>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus laoreet sem at efficitur. Phasellus ultrices quam non quam venenatis, pharetra imperdiet diam hendrerit.</small>
                {form_header("Employee", "If you have someone in mind for the position you can send them an offer here.")}
                {user_data.length === 0 ? <Add_Employee value={user_data} input={set_user_data} /> : null}

                {/* {user_data.length === 0 ? <Add_Employee value={user_data} input={set_user_data} /> : (
                <div className={styles.avatar}>
                    <div onClick={() => set_user_data([])} className={styles.avatar__cancel}>X</div>
                    <img src={user_data.avatar} />
                    <div>
                        <h4 class="bold medium">{user_data.name}</h4>
                        <small>{user_data.email}</small>
                    </div>
                    <div onClick={() => set_selected(1)} className={styles.avatar__button}>Add to Position</div>
                </div>
                )} */}
                <Row gap={1}>
                    {all_users.map(item => <div onClick={() => {set_user_data(item); set_selected(1)}} className={styles.user}><img src={item.avatar} /><small>{item.name.split(" ")[0]}</small></div>)}
                </Row>
            </Column>
            <section className={styles.right__actions}>
                <Row gap={2}>
                    <small>Or</small>
                    <Button_Main width={20} action={() => set_selected(2)}>Start Recruitment</Button_Main>
                </Row>
            </section>
        </main>
    );

    const ce = <div className={styles.container}><Create_Employee data={data} user_data={user_data} /></div>;

    const cp = <Create_Post data={data} close={() => set_selected(0)} />


    const content = [standard, <Create_Employee data={data} user_data={user_data} close={() => {set_selected(0); set_user_data([])}} />, <Create_Post data={data} close={() => set_selected(0)} />]

    return content[selected]
};

export default Vacant_Preview;


