import React, { useEffect, useState } from 'react';
import styles from '../../styles/pages/Office.module.scss';
import { listenRealTimeManagers } from '../../firebase/fetches/Main';
import { get_managers } from '../../firebase/methods/User_Functions';
import { Column, ColumnSpaced, Grid, Highlight, Row, RowSpaced, Table } from '../../tools/global_components';
import { GoPrimitiveDot } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import Bar_Chart from '../../components/charts/Bar';
import { get_companies_employees } from '../../firebase/methods/Company_Functions';
import image_1 from '../../assets/about/1.png';
import Construction from '../../components/UI/Construction';

function Office () {
    const [managers, set_managers] = useState([]);
    const [members, set_members] = useState([]);


    return <main><Construction /></main>

    useEffect(() => {
        const fetch_data = async () => {
            const m = await get_managers();
            const e = await get_companies_employees();
            set_managers(m);
            set_members(e)
        }
        fetch_data()
    }, [])


    return (
        <Column gap={10}>
            <section className={styles.header}>
                <Column gap={2} fixed={true}>
                    <Row gap={0.5}>
                        <p class="medium" style={{fontWeight: 600}}>Lorem ipsum dolor</p>
                        <Highlight>0</Highlight>
                        <Highlight>0</Highlight>
                        <Highlight>0</Highlight>
                    </Row>
                    <Column fixed={true}>
                        <h1>Coworking</h1>
                        <h1 class="medium">Space</h1>
                    </Column>
                    <Row gap={5}>
                        <Row gap={1}>
                            <img className={styles.header__avatar} src={image_1} />
                            <Column>
                                <small>Office Manager</small>
                                <p style={{fontWeight: 600}}>Anna Taylor</p>
                            </Column>
                        </Row>
                        <div className={styles.header__divider}></div>
                        <Row gap={1}>
                            <img className={styles.header__avatar} src={image_1} />
                            <Column>
                                <small>Business Manager</small>
                                <p style={{fontWeight: 600}}>Suzy Chey</p>
                            </Column>
                        </Row>
                    </Row>
                </Column>

                <Column gap={1}>
                        <h4>Open Hours</h4>
                        <p>59 Kingsland Road, London, E1238</p>
                        <Row gap={3}>
                            <Column>
                                <p class="bold">Monday</p>
                                <p>9am-5pm</p>
                            </Column>
                            <Column>
                                <p class="bold">Tuesday</p>
                                <p>9am-5pm</p>
                            </Column>
                            <Column>
                                <p class="bold">Wednesday</p>
                                <p>9am-5pm</p>
                            </Column>
                            <Column>
                                <p class="bold">Thursday</p>
                                <p>9am-5pm</p>
                            </Column>
                            <Column>
                                <p class="bold">Friday</p>
                                <p>9am-5pm</p>
                            </Column>
                        </Row>
                </Column>
            </section>

                <Grid columns={"1fr 1fr"} gap={10}>

                    <section className={styles.block}>
                        <h4>Announcements</h4>
                        <div className={styles.post}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor, lorem et tristique hendrerit, mi sapien rhoncus ex, at pharetra est sapien et est. Vivamus quis semper risus. Pellentesque laoreet velit eu vehicula luctus. Fusce facilisis dolor metus, ac pharetra urna feugiat sit amet. Aenean porta ex id lorem tincidunt, sit amet posuere eros pellentesque. Maecenas elementum nisi ipsum, vitae laoreet tellus consequat quis.</p>
                            <div className={styles.post__creator}>
                                <img src={"https://www.tvguide.com/a/img/resize/01f4cc827535fccd060f74ac9c87687c2d9114ba/hub/2011/05/18/b31a5158-be14-4d19-8276-49f07cda79fa/110515natalie-tenerelli1.jpg?auto=webp&fit=crop&height=675&width=1200"} />
                                <small>Anna Taylor</small>
                                <GoPrimitiveDot />
                                <small>7 March 2022</small>
                            </div>
                        </div>            
                    </section>

                    <section className={styles.block}>
                    <RowSpaced>
                    <h4 className={styles.title}>Events</h4>
                    <small>See More</small>
                </RowSpaced>
                <Column gap={2} fixed={true}>
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
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>12</p></div>
                        <div className={styles.calender__content}>
                            <p>English Lessons</p>
                            <small>In Office - Anna Taylor</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>14:00</p>
                        </div>
                    </div>
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>19</p></div>
                        <div className={styles.calender__content}>
                            <p>English Lessons</p>
                            <small>In Office - Anna Taylor</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>14:00</p>
                        </div>
                    </div>
                    </Column>
        </section>
                </Grid>
                
            <Column gap={2} fixed={true}>
                <div className={styles.magic_block}>
                    <h4>Members</h4>
                    {members.map(item => (
                        <Column gap={1}>
                            <p style={{fontWeight: 600}}>{item.company}</p>
                            <Row gap={1}>
                                {item.employees.map(item => <div className={styles.managers}><img src={item.user_data.avatar} /><small>{item.user_data.name.split(" ")[0]}</small></div>)}  
                            </Row>
                        </Column>
                    ))}
                </div>
            </Column>

        </Column>
    );
};

export default Office;