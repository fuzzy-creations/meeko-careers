import { useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import { Column, RowCentered, RowSpaced, Table } from '../../tools/global_components';
import { IoAddCircleSharp  } from 'react-icons/io5';
import { IoMdToday } from "react-icons/io";
import generatePushID from '../../tools/IDGenerator';
import { create_position, delete_position } from '../../firebase/methods/Position_Functions';
import Employee_Content from './Positions/Employee';
import Recruitment_Content from './Positions/Recruitment';
import Vacant_Content from './Positions/Vacant';
import View_Contract from '../items/Contract';
import Button_Outline from '../buttons/Button_Outline';
import Button_Main from '../buttons/Button_Main';
import Edit_Position from './Positions/Edit';
import Position_History from './Positions/History';
import Position_Posts from './Positions/Posts';
import { management } from '../../tools/global_variables';

const Position = (props) => {
    const data = props.data;
    const [selected, set_selected] = useState(0);
    const users = [<Vacant data={data} select={() => set_selected(5)} />, <Filled data={data} select={() => set_selected(5)} />, <Recruiting data={data} select={() => set_selected(5)} />]


    const duplicate_handler = () => {
        const id = generatePushID();
        const obj = data;
        delete obj.status;
        delete obj.recruitment;
        delete obj.ref_id;
        delete obj.timestamp;
        delete obj.ref_data;
        delete obj.history;
        create_position({...obj, id: id})
    };

    const delete_handler = () => {
        delete_position(data.id)
    };

    const back_handler = () => {
        set_selected(0)
    };


    const duplicate_option = (
        <Column gap={2} marginTop={2}>
            <h4>Duplicate Position</h4>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et cursus neque. Cras eu sem dolor. Integer vel justo id orci tempus pellentesque.</small>
            <Button_Main action={duplicate_handler} width={20}>Duplicate</Button_Main>
        </Column>
    );

    const delete_option = (
        <Column gap={2} marginTop={2}>
            <h4>Delete Position</h4>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et cursus neque. Cras eu sem dolor. Integer vel justo id orci tempus pellentesque.</small>
            <Button_Main action={delete_handler} width={20}>Delete</Button_Main>
        </Column>
    );


    const controller = [<Vacant_Content data={data} />, <Employee_Content employee={data.ref_data} position={data} company={data.company} />, <Recruitment_Content position={data} company={data.company} recruitment={data.ref_data} />][data.status]

    const content = [
        controller, 
        <View_Contract data={data} />, 
        controller, 
        duplicate_option, 
        delete_option, 
        <Edit_Position back={back_handler} data={data}  />, 
        <Position_History data={data} close={() => set_selected(0)} />,
        <Position_Posts data={data} close={() => set_selected(0)} />

    ];

    const main = (

            <main className={styles.main}>
                <section className={styles.left}>

                    {users[data.status]}

                    <RowCentered gap={3}>
                        <div onClick={() => set_selected(6)}><IoAddCircleSharp /></div>
                        <div onClick={() => set_selected(7)}><IoAddCircleSharp /></div>
                    </RowCentered>

                    <Table>
                        <p class="bold">Salary</p><p>{data.salary}k</p>
                        <p class="bold">Management</p><p>{management[data.type]}</p>
                        <p class="bold">Bonus</p><p>{data.bonus ? data.bonus : "No"}</p>
                        <p class="bold">Probation</p><p>{data.probation.exists ? "Yes" : "No"}</p>
                        <p class="bold">Duration</p><p>{data.probation.exists ? `${data.probation.duration} months` : "---"}</p>
                        <p class="bold">Working hours</p><p>{data.hours.length}</p>
                        <p class="bold">Health Insurance</p><p>Yes</p>
                        <p class="bold">Annual Leave</p><p>{data.annual_leave}</p>
                        <p class="bold">Sick Leave</p><p>{data.paid_sick}</p>
                    </Table>


                    <RowSpaced>
                        <small style={{cursor: "pointer"}} class={selected === 3 ? "nav-active" : null} onClick={() => set_selected(3)}>Duplicate</small>
                        <small style={{cursor: "pointer"}} class={selected === 4 ? "nav-active" : null} onClick={() => set_selected(4)}>Delete</small>
                    </RowSpaced>
                </section>

                <section className={styles.right}>
                    {content[selected]}       
                </section>

            </main>
    );

    return main
};

export default Position;



const Vacant = (props) => (
    <div className={styles.avatar}>
        <div className={styles.avatar__icon}><IoAddCircleSharp /></div>
        <div>
            <h4>{props.data.title}</h4>
            <small>{props.data.company.name}</small>
        </div>
        <Button_Outline action={props.select}>Edit</Button_Outline>
    </div>
);

const Filled = (props) => (
    <div className={styles.avatar}>
        <img src={props.data.ref_data.user_data.avatar} />
        <div>
            <h4>{props.data.title}</h4>
            <small>{props.data.company.name}</small>
        </div>
        <Button_Outline action={props.select}>Edit</Button_Outline>
    </div>
);

const Recruiting = (props) => (
    <div className={styles.avatar}>
        <div className={styles.avatar__icon}><IoMdToday /></div>
        <div>
            <h4>{props.data.title}</h4>
            <small>{props.data.company.name}</small>
        </div>
        <Button_Outline action={props.select}>Edit</Button_Outline>
    </div>
);
