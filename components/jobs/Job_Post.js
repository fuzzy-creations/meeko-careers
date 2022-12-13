import styles from '../../styles/components/jobs/Job_Post.module.scss';
import Button_Main from '../buttons/Button_Main';
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { job_categories, job_hours, job_remote, management } from '../../tools/global_variables';
import { time_since } from '../../tools/DateTime_Methods';
import { useContext, useState } from 'react';
import Apply from '../forms/Apply';
import { AuthContext } from '../../contexts/Auth.context';
import Modal from '../UI/Modal';
import Button_Outline from '../buttons/Button_Outline';
import { Column, Row, RowSpaced } from '../../tools/global_components';



function Job_Post (props) {
    const data = props.data;
    const { user, set_login_open } = useContext(AuthContext);
    const [apply_open, set_apply_open] = useState(false);

    const open_handler = (data) => {
        set_apply_open(true);
        document.body.style.overflow = "hidden";
    };

    return (
        <>
        <div className={`${styles.preview} ${props.selected ? styles.active : null}`} onClick={() => props.select()}>
            <RowSpaced>
                <Column>
                    <small>{job_categories[data.category]}</small>
                    <h3>{data.position.title}</h3>
                </Column>
                <small>{time_since(data.timestamp)}</small>
            </RowSpaced>
            <div className={styles.preview__details}>
                <Row gap={1}><FiCreditCard/><p class="bold">{data.position.salary}k</p><small>/ year</small></Row>
                <Row gap={1}><FiBriefcase/><p class="bold">{data.position.hours.length}</p><small>/ week</small></Row>
                <Row gap={1}><GoLocation /><p class="bold">{management[data.position.type]}</p></Row>
            </div>
            <div>
                <small>{data.about.slice(0, 200)}{data.about.length > 200 ? "..." : null}</small>
            </div>
            <div className={styles.preview__action}> 
                 {user ? (props.applied ? <Button_Outline height={4} width={15} action={open_handler}>Applied</Button_Outline> : <Button_Main width={15} action={open_handler}>Apply</Button_Main>) : <Button_Main width={15} action={() => set_login_open(true)}>Apply</Button_Main>}
                <h5><FaRegBookmark /></h5>
            </div>
        </div>
        {apply_open ? <Modal close={() => set_apply_open(false)} ><Apply applied={props.applied} data={data}/></Modal> : null}
        </>
    )
}

export default Job_Post;