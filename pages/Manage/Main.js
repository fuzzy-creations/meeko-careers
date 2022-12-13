
import styles from '../../styles/pages/Main/Dashboard.module.scss';
import { useState, useContext, useEffect } from 'react';

import { MdLocationOn } from "react-icons/md";

import { Column, ColumnSpaced, Row, RowSpaced, Table } from "../../tools/global_components";
import moment from 'moment';
import { AuthContext } from "../../contexts/Auth.context";
import { ManageContext } from "../../contexts/Manage.context";
import Pie_Chart from "../../components/charts/Pie_Chart";
import Interview_Preview from "../../components/previews/Interview_Preview";
import Card_Medium from "../../components/items/Card_Medium";
import { IoBrowsersOutline, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5";
import Header_Modal from "../../components/headers/Header_Modal";
import Background_Shape from "../../components/UI/Background_Shape";
import Construction from '../../components/UI/Construction';


function Main (props) {
    const { user_data } = useContext(AuthContext);
    const { profile, interviews, users, applications, posts, positions } = useContext(ManageContext);

    return <main><Construction /></main>
    return (
        <main className={styles.home} style={{height: "95%"}}>
            <ColumnSpaced fixed={true}>
                <div>
                    <Header_Modal>Lorem ipsum dolor</Header_Modal>
                    <h4 class="medium">Welcome back, {user_data.name.split(" ")[0]}!</h4>
                </div>
                <RowSpaced>
                    <Card_Medium name={"Name"}>{profile.name}</Card_Medium>
                    <Card_Medium name={"Positions"}>{positions.length} Filled</Card_Medium>
                    <Card_Medium name={"Finance"}>£9000</Card_Medium>
                </RowSpaced>
            </ColumnSpaced>


            <Background_Shape color={"blue"} fade={true}>
            <section className={styles.company}>
               
               <div className={styles.company__details}>
                   <h4 className={styles.header}>{profile.name}</h4>
                   <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.</small>

                   <Row gap={1}>
                       <div className={styles.company__social}><IoBrowsersOutline /></div>
                       <div className={styles.company__social}><IoLogoFacebook /></div>
                       <div className={styles.company__social}><IoLogoTwitter /></div>
                       <div className={styles.company__social}><IoLogoLinkedin /></div>
                   </Row>
               </div>

               <div className={styles.company__logo}>
               </div>
           </section>
           </Background_Shape>


            <Column gap={2} fixed={true}>
                <RowSpaced>
                    <h4 className={styles.header}>Requests</h4>
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
                            <p>Annual Leave</p>
                            <small>Approved</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>Full Day</p>
                        </div>
                    </div>
                </Column>
            </Column>

            <Column gap={2} fixed={true}>
                <RowSpaced>
                    <h4 className={styles.header}>Interviews</h4>
                    <small>See More</small>
                </RowSpaced>
                <Column gap={2} fixed={true}>
                    {interviews.map(item => <Interview_Preview 
                        data={item} 
                        user_data={users.find(obj => obj.id === item.applicant)}
                        application={applications.find(obj => obj.application_id === item.application_id)}
                        interviews={interviews.filter(obj => obj.application_id === item.application_id )} 
                        company={profile}  
                        position={positions.find(obj => obj.id === item.position_id)}  
                        post={posts.find(obj => obj.post_id === item.post_id)} 
                    
                    />)}
                </Column>
            </Column>


            <section className={styles.info}>
                <div className={styles.info__header}>
                    <h4 className={styles.header}>Details</h4>
                    <small>Lorem ipsum dolor sit amet.</small>
                </div>
                <Row gap={2.5} overflow={true} nowrap={true}>
    
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Posts</p>
                        <div className={styles.square__chart}><Pie_Chart labels={["Active", "Complete"]} data={[1, 2]}  /></div>
                        <small>3</small>
                    </div>
                    
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Positions</p>
                        <div className={styles.square__chart}><Pie_Chart labels={["Filled", "Recruit", "Vacant"]} data={[11, 2, 1]}  /></div>
                        <small>14</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Management</p>
                        <div className={styles.square__chart}><Pie_Chart labels={["Onsite", "Part", "Remote", "Remove Equip"]} data={[5, 5, 1, 0]}  /></div>
                        <small>11</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Average Salary</p>
                        <h4 className={styles.bold}>44k</h4>
                        <small>Annual</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Managers</p>
                        <h4 className={styles.bold}>2</h4>
                        <small>-</small>
                    </div>
                    <div className={styles.square}>
                        <div className={styles.square__icon}><MdLocationOn /></div>
                        <p class="bold">Contract</p>
                        <h4 className={styles.bold}>Signed</h4>
                        <small>11/08/2021</small>
                    </div>
                </Row>
            </section>
                
        </main>
    )

};

export default Main;
