import styles from '../../styles/pages/Main/Dashboard.module.scss';
import { useState, useContext, useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import { IoBrowsersOutline, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5";
import { ProfileContext } from "../../contexts/Profile.context";
import { Column, ColumnSpaced, Row, RowSpaced, Table } from "../../tools/global_components";
import moment from 'moment';
import { AuthContext } from "../../contexts/Auth.context";
import Card_Medium from "../../components/items/Card_Medium";
import { management } from "../../tools/global_variables";
import { calendar } from "../../tools/DateTime_Methods";
import Background_Shape from "../../components/UI/Background_Shape";
import Header_Modal from "../../components/headers/Header_Modal";


function Job (props) {
    const { user_data, invoices, rota } = useContext(AuthContext);
    const { profile } = useContext(ProfileContext);
    const position = profile.position;
    const company = profile.company;


    return (
        <main className={styles.home}>
            <ColumnSpaced fixed={true}>
                <div>
                    <Header_Modal>Lorem ipsum dolor</Header_Modal>
                    <h4 class="medium">Welcome back, {user_data.name.split(" ")[0]}!</h4>
                </div>
                <RowSpaced>
                    <Card_Medium name={"Title"}>{position.title}</Card_Medium>
                    <Card_Medium name={"Salary"}>£{position.salary},000</Card_Medium>
                    <Card_Medium name={"Management"}>{management[position.type]}</Card_Medium>
        
                </RowSpaced>
            </ColumnSpaced>

            <Background_Shape color={"blue"} fade={true}>
                <section className={styles.company}>
                
                    <div className={styles.company__details}>
                        <h4 className={styles.header}>{company.name}</h4>
                        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.</small>

                        <Row gap={1}>
                            <div className={styles.company__social}><IoBrowsersOutline /></div>
                            <div className={styles.company__social}><IoLogoFacebook /></div>
                            <div className={styles.company__social}><IoLogoTwitter /></div>
                            <div className={styles.company__social}><IoLogoLinkedin /></div>
                        </Row>
                    </div>

                    <div className={styles.company__logo}>
                        {/* <img src={sc} /> */}
                    </div>
                </section>
            </Background_Shape>
           


            <Column gap={2} fixed={true}>
                <RowSpaced>
                    <h4 className={styles.header}>Tasks</h4>
                    <small>See More</small>
                </RowSpaced>
                <Column gap={2} fixed={true}>
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>05</p></div>
                        <div className={styles.calender__content}>
                            <p>Invoice</p>
                            <small>Pending</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>Monthly</p>
                        </div>
                    </div>
                    <div className={styles.calender}>
                        <div className={styles.calender__date}><p>12</p></div>
                        <div className={styles.calender__content}>
                            <p>Rota</p>
                            <small>Pending</small>
                        </div>
                        <div className={styles.calender__time}>
                            <MdLocationOn />
                            <p>Weekly</p>
                        </div>
                    </div>
                </Column>
            </Column>

            <Column gap={2} fixed={true}>
                <RowSpaced>
                    <h4 className={styles.header}>Schedule</h4>
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


            <Background_Shape color={"pink"} fade={true} custom={"gridColumn"} amount={"1/3"}>
                <section className={styles.info}>
                    
                    <div className={styles.info__header}>
                        <h4 className={styles.header}>Details</h4>
                        <small>Lorem ipsum dolor sit amet.</small>
                    </div>
                    <Row gap={2.5} overflow={true} nowrap={true}>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Hours</p>
                            <h4 className={styles.bold}>{position.hours.length}</h4>
                            <small>Per Week</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Probation</p>
                            <h4 className={styles.bold}>{position.probation.duration}</h4>
                            <small>Months</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Health Insurance</p>
                            <h4 className={styles.bold}>Yes</h4>
                            <small>-</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Annual Leave</p>
                            <h4 className={styles.bold}>{position.annual_leave}</h4>
                            <small>Days</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Sick Leave</p>
                            <h4 className={styles.bold}>{position.paid_sick}</h4>
                            <small>Days</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Bonus Tier</p>
                            <h4 className={styles.bold}>3</h4>
                            <small>Quarter</small>
                        </div>
                        <div className={styles.square}>
                            <div className={styles.square__icon}><MdLocationOn /></div>
                            <p class="bold">Contract</p>
                            <h4 className={styles.bold}>Signed</h4>
                            <small>{calendar(profile.timestamp)}</small>
                        </div>
                    </Row>
                </section>
            </Background_Shape>
                
        </main>
    )

};

export default Job;