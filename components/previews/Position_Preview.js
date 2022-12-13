import styles from '../../styles/components/previews/Position_Preview.module.scss';
import { time_since } from '../../tools/DateTime_Methods';
import { Column, Row, RowSpaced } from '../../tools/global_components';
import Click_Modal from '../items/Click_Modal';
import Position from '../manage/Position';
import { management } from '../../tools/global_variables';
import Background_Shape from '../UI/Background_Shape';
import { IoAddCircleSharp, IoIdCardOutline, IoShapesOutline, IoChatbubblesOutline, IoReaderOutline, IoCalendarClearOutline, IoPeopleOutline, IoPlanetOutline  } from 'react-icons/io5';
import { TbLetterM } from "react-icons/tb";


function Position_Preview (props) {
    const data = props.data;
    const main = [<Vacant data={data} />, <Filled data={data} />, <Recruiting data={data} />][data.status]
    return <Click_Modal custom={true} content={main}><Position data={data} /></Click_Modal>
};

export default Position_Preview;


const Vacant = (props) => {
    const data = props.data;

    return (
        <Background_Shape color={"green"} fade={true} custom={"width"} amount={"100%"}>
            <div className={styles.profile}>  
                <RowSpaced>
                    <Row gap={2}>
                    <div className={styles.avatar}><IoAddCircleSharp /></div>
                        <Column fixed={true}>
                            <h4 className={styles.name}>Vacant</h4>
                            <small>{time_since(data.timestamp)}</small>
                        </Column>
                    </Row>
                    <h4 className={styles.bold}>{data.salary}k</h4>
                </RowSpaced>
                <RowSpaced>
                <Column fixed={true} gap={0.5}>
                        <Row gap={1}><IoShapesOutline /><p class="bold">{data.title}</p></Row>
                        <Row gap={1}><TbLetterM /><p class="bold">{management[data.type]}</p></Row>
                    </Column>
                    <section className={styles.icons}>
                        <div><IoPlanetOutline /></div>
                    </section>
                </RowSpaced>
            </div>
        </Background_Shape>
    );
};

const Filled = (props) => {
    const data = props.data;

    return (
        <Background_Shape color={"blue"} fade={true} custom={"width"} amount={"100%"}>
            <div className={styles.profile}>  
                <RowSpaced>
                    <Row gap={2}>
                        <div className={styles.avatar} style={{"backgroundImage": `url(${data.ref_data.user_data.avatar})`}}></div>
                        <Column fixed={true}>
                            <h4 className={styles.name}>{data.ref_data.user_data.name}</h4>
                            <small>{data.ref_data.accepted ? data.probation.exists ? "Probation" : "Employee" : "Pending"}</small>
                        </Column>
                    </Row>
                    <h4 className={styles.bold}>{data.salary}k</h4>
                </RowSpaced>
                <RowSpaced>
                    <Column fixed={true} gap={0.5}>
                        <Row gap={1}><IoShapesOutline /><p class="bold">{data.title}</p></Row>
                        <Row gap={1}><TbLetterM /><p class="bold">{management[data.type]}</p></Row>
                    </Column>
                    <section className={styles.icons}>
                        <div><IoReaderOutline /></div>
                        <div><IoCalendarClearOutline /></div>
                        <div><IoChatbubblesOutline /></div>
                    </section>
                </RowSpaced>
            </div>
        </Background_Shape>
    );
};




const Recruiting = (props) => {
    const data = props.data;
    
    return (
        <Background_Shape color={"purple"} fade={true} custom={"width"} amount={"100%"}>
            <div className={styles.profile}>  
                <RowSpaced>
                    <Row gap={2}>
                        {data.ref_data.applicants.length === 0 ? (
                            <small className={styles.applicants__zero}>{data.ref_data.applicants.length > 50 ? "50+" : data.ref_data.applicants.length}</small> 
                            ) : (
                            <div className={styles.applicants}>
                                {data.ref_data.applicants.map(item => <div className={styles.applicants__applicant} style={{ backgroundImage: `url(${item.user_data.avatar})` }}></div>).slice(0, 3)}
                                <small className={styles.applicants__end}>{data.ref_data.applicants.length > 50 ? "50+" : data.ref_data.applicants.length}</small>
                            </div>
                        )}

                        <Column fixed={true}>
                            <h4 className={styles.name}>Recruting</h4>
                            <small>{data.ref_data.closed ? "Closed" : data.ref_data.selected ? "Offer Made" : data.ref_data.paused ? "Paused" : "Active"}</small>
                        </Column>
                    </Row>
                    <h4 className={styles.bold}>{data.salary}k</h4>
                </RowSpaced>
                <RowSpaced>
                    <Column fixed={true} gap={0.5}>
                        <Row gap={1}><IoShapesOutline /><p class="bold">{data.title}</p></Row>
                        <Row gap={1}><TbLetterM /><p class="bold">{management[data.type]}</p></Row>
                    </Column>
                    <section className={styles.icons}>
                        <div><IoIdCardOutline /></div>
                        <div><IoPeopleOutline /></div>
                    </section>
                </RowSpaced>
            </div>
        </Background_Shape>        
    );
};


