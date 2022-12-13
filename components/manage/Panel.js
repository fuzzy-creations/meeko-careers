import { useContext, useState } from "react";
import styles from '../../styles/components/UI/Panel.module.scss';
import { IoMdLogOut, IoMdArrowDropdown, IoIosPeople } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks, FaChevronDown, FaChevronLeft, FaCog } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NotificationContext } from "../../contexts/Notification.context";
import { sign_out } from "../../firebase/methods/User_Functions";
import Button_Main from "../buttons/Button_Main";
import { ManageContext } from "../../contexts/Manage.context";
import { AuthContext } from "../../contexts/Auth.context";
import { IoHomeOutline, IoChatbubblesOutline, IoClipboardOutline, IoCalendarClearOutline, IoConstructOutline, IoIdCardOutline, IoTimeOutline, IoDocumentTextOutline, IoFileTrayFullOutline, IoListOutline, IoGridOutline,IoBasketballOutline, IoLaptopOutline, IoPersonCircleOutline,IoReaderOutline, IoStatsChartOutline, IoTodayOutline, IoCardOutline } from "react-icons/io5";
import { VscTable, VscCode, VscOrganization, VscChecklist } from "react-icons/vsc";
import { TbLetterM } from "react-icons/tb";

function Panel (props) {
    const { profile, companies, set_selected_company } = useContext(ManageContext);
    const { user_data } = useContext(AuthContext);
    const [selected, set_selected] = useState(0);
    const history = useHistory();
    const location = useLocation();
    const { display_notes } = useContext(NotificationContext);


    const sign_out_handler = () => {
        sign_out();
        history.push("/")
    }

    const options = (
        <>
        <section className={styles.options}>
            <div className={location.pathname === "/manage" ? styles.options_active : null} onClick={() => {history.push('/manage');}}><AiOutlineHome /><small>Home</small></div>
            <div className={location.pathname === "/manage/meeko" ? styles.options_active : null} onClick={() => {history.push("/manage/meeko")}}><TbLetterM /><small>Meeko</small></div>
            <div className={location.pathname === "/manage/projects" ? styles.options_active : null} onClick={() => {history.push("/manage/projects")}}><VscCode /><small>Projects</small></div>
            <div className={location.pathname === "/manage/positions" ? styles.options_active : null} onClick={() => {history.push('/manage/positions');}}><IoStatsChartOutline /><small>Positions</small></div>
            <div className={location.pathname === "/manage/employees" ? styles.options_active : null} onClick={() => {history.push('/manage/employees');}}><VscOrganization /><small>Employees</small></div>
            <div className={location.pathname === "/manage/recruitment" ? styles.options_active : null} onClick={() => {history.push("/manage/recruitment")}}><VscChecklist /><small>Recruitment</small></div>
            <div className={location.pathname === "/manage/interviews" ? styles.options_active : null} onClick={() => {history.push("/manage/interviews")}}><IoIdCardOutline /><small>Interviews</small></div>
            <div className={location.pathname === "/manage/invoices" ? styles.options_active : null} onClick={() => {history.push('/manage/invoices');}}><IoReaderOutline /><small>Invoices</small></div>
            <div className={location.pathname === "/manage/requests" ? styles.options_active : null} onClick={() => {history.push("/manage/requests")}}><IoChatbubblesOutline /><small>Requests</small></div>
            <div className={location.pathname === "/manage/rota" ? styles.options_active : null} onClick={() => {history.push("/manage/rota")}}><IoCalendarClearOutline /><small>Rota</small></div>
            <div className={location.pathname === "/manage/equipment" ? styles.options_active : null} onClick={() => {history.push("/manage/equipment")}}><IoLaptopOutline /><small>Equipment</small></div>
            <div className={location.pathname === "/manage/events" ? styles.options_active : null} onClick={() => {history.push("/manage/events")}}><IoBasketballOutline /><small>Events</small></div>
            {/* <div className={location.pathname === "/manage/analytics" ? styles.options_active : null} onClick={() => {history.push("/manage/analytics")}}><FiMessageSquare /><small>Analytics</small></div> */}
        </section>

        <section className={styles.actions}>
            <div onClick={() => set_selected(1)} className={styles.actions__icon}><IoMdLogOut /></div>
            <div className={styles.actions__icon}><FaCog /></div>
        </section>
    </>
    );


    const notification = (
        <main className={styles.notes}>
            <div className={styles.notes__title}>
                <h2>Notifications</h2>
            </div>
            <div><p>You've applied for UX Designer</p></div>
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

    const list = (
        <section className={styles.list}>
            <section className={styles.list__column}>
                <div onClick={() => {set_selected_company(false); set_selected(0)}}><p>Meeko</p></div>
                {companies.map(item => <div onClick={() => {set_selected_company(item.id); set_selected(0)}}><p>{item.name}</p></div>)}
            </section>
        </section>
    );


    const content = [options, logout, list];

    const main = (
        <main className={styles.panel}>
            <section className={styles.user}>
                <img src={user_data.avatar} />
                <h5 class="bold">{user_data.name}</h5>
                {user_data.admin ? <small className={styles.user__selector} onClick={selected === 2 ? () => set_selected(0) : () => set_selected(2)}>{profile ? profile.name : "Meeko"}</small> : <small>{profile ? profile.name : ""}</small>}
            </section>

            {content[selected]}
        </main>
    );




    return display_notes ? notification : main;
};

export default Panel;