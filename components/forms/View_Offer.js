
import { useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import { Column, Row, RowSpaced, Table } from '../../tools/global_components';
import { IoAddCircleSharp  } from 'react-icons/io5';
import View_Contract from '../items/Contract';
import Button_Outline from '../buttons/Button_Outline';
import Button_Main from '../buttons/Button_Main';
import Header_Modal from '../headers/Header_Modal';
import { fill_position, vacate_position } from '../../firebase/methods/Position_Functions';
import { close_post, unselect_applicant } from '../../firebase/methods/Post_Functions';
import { accept_employee, delete_employee } from '../../firebase/methods/Employee_Functions';
import { useHistory } from 'react-router-dom';
import { unselect_application } from '../../firebase/methods/Applicant_Functions';


const View_Offer = (props) => {
    const position = props.position;
    const company = props.company;
    const employee = props.employee;
    const user_data = props.user_data;
    const [selected, set_selected] = useState(0);
    const history = useHistory();

    console.log(props)



    const sign_handler = () => {
        // console.log(position)
        // console.log(employee)
        if(position.recruitment) {
            close_post(position.ref_id);
        }
        accept_employee(employee.employee_id)
        fill_position(position.id, employee.employee_id);
        history.push("/dashboard")

    }

    const decline_handler = () => {
        if(position.recruitment) {
            delete_employee(employee.employee_id);
            unselect_applicant(position.ref_id);
            unselect_application(props.application.application_id)
            props.close()
        } else {
            delete_employee(employee.employee_id);
            vacate_position(position.id);
            props.close()
        }
    }


    const delete_handler = () => {
        
    };

    const back_handler = () => {
        set_selected(0)
    };

    const main = (
        <Column gap={3}>
            <Header_Modal>Contract Offer</Header_Modal>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus laoreet sem at efficitur. Phasellus ultrices quam non quam venenatis, pharetra imperdiet diam hendrerit.</small>
            <View_Contract data={position} company={company} user_data={user_data} employee={employee} />
        </Column>
    )

    const content = [main]

    return (
        <main className={styles.main}>
        <section className={styles.left}>

            <div className={styles.avatar}>
                <div className={styles.avatar__icon}><IoAddCircleSharp /></div>
                <div>
                    <h4>{position.title}</h4>
                    <small>{company.name}</small>
                </div>
            </div>

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

            <RowSpaced>
                
            </RowSpaced>
        </section>

        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                {content[selected]}
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        {/* <Button_Outline action={() => set_selected(0)} height={4}>Back</Button_Outline> */}
                        <Button_Main width={20} action={decline_handler}>Decline</Button_Main>
                        <Button_Main width={20} action={sign_handler}>Sign</Button_Main>
                    </Row>
                </section>
            </div>
        </section>

    </main>
    );
};

export default View_Offer;
