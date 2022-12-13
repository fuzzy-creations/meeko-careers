import styles from '../../styles/components/main/Preview.module.scss';
import { interview_icons } from '../../tools/global_variables';
import { time_since } from '../../tools/DateTime_Methods';
import Click_Modal from '../../components/items/Click_Modal';
import Applicant from '../manage/Applicant';
import { applicant_status } from '../../tools/global_functions';
import { Column, Row, RowSpaced } from '../../tools/global_components';
import Background_Shape from '../UI/Background_Shape';
import { IoPersonCircleOutline, IoLocationOutline  } from 'react-icons/io5';


function Applicant_Preview (props) {
    const data = props.data;
    const job_data = props.job_data;
    const interviews = props.interviews;
    const position = props.position;
    const company = props.company;


    const main = ( 
        <Background_Shape color={"blue"} fade={true} custom={"width"} amount={"100%"}>
            <div className={styles.rectangle}>  
                <RowSpaced>
                    <Row gap={2}>
                        <div className={styles.rectangle__avatar} style={{"backgroundImage": `url(${data.user_data.avatar}`}}></div>
                        <Column fixed={true}>
                            <h4 className={styles.name}>{data.user_data.name}</h4>
                            <small>Kyiv</small>
                        </Column>
                    </Row>
                    <Row gap={1}>{interviews.map(item => <div>{interview_icons[item.type]}</div>)}</Row>
                </RowSpaced>
                <RowSpaced>
                    <Column fixed={true} gap={0.5}>
                        <Row gap={1}><IoLocationOutline /><p class="bold">{applicant_status(data)}</p></Row>
                        <Row gap={1}><IoPersonCircleOutline /><p class="bold">{time_since(data.user_data.activity)}</p></Row>
                    </Column>
                    <section className={styles.rectangle__icons}>
                        <small>{data.user_data.email}</small>
                    </section>
                </RowSpaced>
            </div>
        </Background_Shape>
    )

    return <Click_Modal embedded={true} custom={true} content={main}><Applicant embedded={true} data={data} position={position} company={company} job_data={job_data} interviews={interviews}  /></Click_Modal>
};


export default Applicant_Preview;