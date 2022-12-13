
import { useContext } from 'react';
import styles from '../../styles/pages/Dashboard/Home.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';
import { ProfileContext } from '../../contexts/Profile.context';
import { Column, Grid, Row, RowSpaced } from '../../tools/global_components';
import Job from './Job';
import Button_Main from '../../components/buttons/Button_Main';
import { MdLocationOn } from "react-icons/md";
import Empty from '../../components/UI/Empty';
import Empty_List from '../../components/UI/Empty_List';
import Application_Preview from '../../components/previews/Application_Preview';
import Interview_Preview from '../../components/previews/Interview_Preview';
import Background_Shape from '../../components/UI/Background_Shape';


function Home (props) {
    const { user_data } = useContext(AuthContext);
    const { profile, applications, interviews } = useContext(ProfileContext);
    const history = useHistory();

    const active = applications[0];

    const t = (
        <div className={styles.calender}>
            <div className={styles.calender__date}><p>05</p></div>
            <div className={styles.calender__content}>
                <p>English Lessons</p>
                <small>In Office - Anna Taylor</small>
            </div>
            <div className={styles.calender__time}>
                <MdLocationOn />
                <p>14:00</p>
            </div>
        </div>
    );


    return profile ? <Job /> : (
        <main className={styles.home}>
           <section className={styles.menu}>
                <div className={styles.home__content} gap={3}>
                    <h4 class="medium">Hi, {user_data.name.split(" ")[0]}</h4>
                    <Column fixed={true}>
                        <h2>Lorem ipsum</h2>
                        <h2 class="medium">Dolor sit amet ipsm</h2>
                    </Column>
                    <Button_Main action={() => history.push('/jobs')} width={20}>Start</Button_Main>
                </div>
                <Link to={`/dashboard/applications`} className={styles.item}>
                    <Background_Shape color={"purple"}><div className={`${styles.item__box}`}></div></Background_Shape>
                    <h4 className={styles.item__text}>Applications</h4>
                </Link>
                <Link to={`/dashboard/interviews`} className={styles.item}>
                <Background_Shape color={"pink"}><div className={`${styles.item__box}`}></div></Background_Shape>
                    <h4 className={styles.item__text}>Interviews</h4>
                </Link>
                <Link to={`/dashboard/offers`} className={styles.item}>
                <Background_Shape color={"blue"}><div className={`${styles.item__box}`}></div></Background_Shape>
                    <h4 className={styles.item__text}>Offers</h4>
                </Link>
                <Link to={`/dashboard/projects`} className={styles.item}>
                <Background_Shape color={"green"}><div className={`${styles.item__box}`}></div></Background_Shape>
                    <h4 className={styles.item__text}>Projects</h4>
                </Link>
                {/* <Click_Modal content={modal_item}>{options_grid}</Click_Modal>        */}
            </section>
            <Grid columns={"1fr 1fr"} gap={20} rows={"100%"}>
                <Column gap={3} fixed={true}>
                    <RowSpaced>
                        <h4 className={styles.header}>Schedule</h4>
                        <small style={{cursor: "pointer"}} onClick={() => history.push('/dashboard/interviews')}>See More</small>
                    </RowSpaced>
                    <Column gap={2} fixed={true} height={"100%"}>
                        <Empty_List>
                            {interviews.map(data => <Interview_Preview 
                                data={data} 
                                application={applications.find(item => item.application_id === data.application_id)}
                                interviews={interviews.filter(item => item.application_id === data.application_id)}
                                user_data={data.manager}
                                applicant={true}
                                />
                            )}
                        </Empty_List>
                    </Column>
                </Column>
                <Column gap={3}>
                    <RowSpaced>
                        <h4 className={styles.header}>Recent Application</h4>
                        <small style={{cursor: "pointer"}} onClick={() => history.push('/dashboard/applications')}>See More</small>
                    </RowSpaced>
                        {active ? <Application_Preview mini={true} data={active} interviews={interviews.filter(item => item.application_id === active.application_id)} /> : <Empty />}
                </Column>
            </Grid>


        </main>
    );
};

export default Home;


