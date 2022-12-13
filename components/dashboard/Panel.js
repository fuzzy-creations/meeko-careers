import { useContext, useState } from "react";
import styles from '../../styles/components/UI/Panel.module.scss';
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks, FaChevronDown, FaChevronLeft, FaCog } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NotificationContext } from "../../contexts/Notification.context";
import { sign_out } from "../../firebase/methods/User_Functions";
import Button_Main from "../buttons/Button_Main";
import { ProfileContext } from "../../contexts/Profile.context";
import Notifications from "../UI/Notifications";
import { AuthContext } from "../../contexts/Auth.context";
import { IoChatbubblesOutline, IoClipboardOutline, IoCalendarClearOutline,IoMedalOutline, IoConstructOutline, IoIdCardOutline, IoTimeOutline, IoDocumentTextOutline, IoFileTrayFullOutline,IoBasketballOutline, IoListOutline, IoGridOutline, IoLaptopOutline, IoPersonCircleOutline,IoReaderOutline, IoStatsChartOutline, IoTodayOutline, IoCardOutline } from "react-icons/io5";
import { VscTable, VscCode, VscOrganization, VscChecklist } from "react-icons/vsc";
import { TbLetterM } from "react-icons/tb";


function Panel (props) {
    const { user_data } = useContext(AuthContext);
    const { profile } = useContext(ProfileContext);
    const [selected, set_selected] = useState(0);
    const history = useHistory();
    const location = useLocation();
    const { display_notes } = useContext(NotificationContext);

    const sign_out_handler = () => {
        sign_out();
        history.push("/")
    }

 /// only show options with content 


    const main = (
        <main className={styles.panel}>
            <section className={styles.user}>
                <img src={user_data.avatar} />
                <h5 class="bold">{user_data.name}</h5>
                {display_notes ? <small>Notifications</small> : <small>{profile ? profile.company.name : "Applicant"}</small>}
            </section>

            {display_notes ? <Notifications /> : profile ? (
                <section className={styles.options}>
                    <div className={location.pathname === "/dashboard" ? styles.options_active : null} onClick={() => {history.push('/dashboard');}}><AiOutlineHome /><small>Home</small></div>
                    <div className={location.pathname === "/dashboard/meeko" ? styles.options_active : null} onClick={() => {history.push("/dashboard/meeko")}}><TbLetterM /><small>Meeko</small></div>
                    <div className={location.pathname === "/dashboard/projects" ? styles.options_active : null} onClick={() => {history.push("/dashboard/projects")}}><VscCode /><small>Projects</small></div>
                    <div className={location.pathname === "/dashboard/rota" ? styles.options_active : null} onClick={() => {history.push("/dashboard/rota")}}><IoCalendarClearOutline /><small>Rota</small></div>
                    <div className={location.pathname === "/dashboard/invoices" ? styles.options_active : null} onClick={() => {history.push('/dashboard/invoices');}}><IoReaderOutline /><small>Invoices</small></div>
                    <div className={location.pathname === "/dashboard/events" ? styles.options_active : null} onClick={() => {history.push("/dashboard/events")}}><IoBasketballOutline /><small>Events</small></div>
                    <div className={location.pathname === "/dashboard/equipment" ? styles.options_active : null} onClick={() => {history.push("/dashboard/equipment")}}><IoLaptopOutline /><small>Equipment</small></div>
                    <div className={location.pathname === "/dashboard/applications" ? styles.options_active : null} onClick={() => {history.push('/dashboard/applications');}}><IoListOutline /><small>Applications</small></div>
                    <div className={location.pathname === "/dashboard/interviews" ? styles.options_active : null} onClick={() => {history.push("/dashboard/interviews")}}><IoIdCardOutline /><small>Interviews</small></div>
                    <div className={location.pathname === "/dashboard/offers" ? styles.options_active : null} onClick={() => {history.push("/dashboard/offers")}}><IoMedalOutline /><small>Offers</small></div>
                </section>
                ) : (
                    <section className={styles.options}>
                    <div className={location.pathname === "/dashboard" ? styles.options_active : null} onClick={() => {history.push('/dashboard');}}><AiOutlineHome /><small>Home</small></div>
                    <div className={location.pathname === "/dashboard/applications" ? styles.options_active : null} onClick={() => {history.push('/dashboard/applications');}}><IoListOutline /><small>Applications</small></div>
                    <div className={location.pathname === "/dashboard/interviews" ? styles.options_active : null} onClick={() => {history.push("/dashboard/interviews")}}><IoIdCardOutline /><small>Interviews</small></div>
                    <div className={location.pathname === "/dashboard/offers" ? styles.options_active : null} onClick={() => {history.push("/dashboard/offers")}}><IoMedalOutline /><small>Offers</small></div>
                    <div className={location.pathname === "/dashboard/projects" ? styles.options_active : null} onClick={() => {history.push("/dashboard/projects")}}><VscCode /><small>Projects</small></div>
                    </section>
                )
                }
    
            <section className={styles.actions}>
                <div onClick={() => set_selected(1)} className={styles.actions__icon}><IoMdLogOut /></div>
                <div className={styles.actions__icon}><FaCog /></div>
            </section>
        </main>
    );

    const logout = (
        <main className={styles.logout}>
            <section>
                <h4>Are you sure you want to log out?</h4>
                <Button_Main action={sign_out_handler}>Logout</Button_Main>
                <Button_Main action={() => set_selected(0)}>Cancel</Button_Main>
            </section>
        </main>
    );

    const content = [main, logout];


    return content[selected];
};

export default Panel;