import styles from '../styles/pages/Dashboard.module.scss';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import Nav from '../components/UI/Nav';
import Positions from './Manage/Positions';
import Panel from '../components/manage/Panel';
import { Route } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader_Dash from '../components/UI/Loader_Dash';
import { ManageContext } from '../contexts/Manage.context';
import Invoices from './Manage/Invoices';
import Projects from './Manage/Projects';
import Interviews from './Manage/Interviews';
import Rota from './Manage/Rota';
import Office from './Manage/Office';
import Events from './Manage/Events';
import Equipment from './Manage/Equipment';
import Home from './Manage/Home';
import Recruitment from './Manage/Recruitment';
import Employees from './Manage/Employees';
import Analytics from './Manage/Analytics';
import Requests from './Manage/Requests';



function Manage (props) {
    const params = props.match.params.type;
    const { user_data } = useContext(AuthContext);
    const { loader } = useContext(ManageContext);
    const [display, set_display] = useState(true);

    if(loader) { return <Loader_Dash /> }


    return (
        <main className={`${styles.dashboard} ${display === false ? styles.dashboard__hidden : null}`}>
            <div onClick={() => set_display(!display)} className={styles.operator}>{display ? <FaChevronRight /> : <FaChevronLeft />}</div>
            <div className={styles.container}>
                <Nav />
                <section className={styles.main}>
                    <Route exact path="/manage" render={(props) => <Home /> } /> 
                    <Route exact path="/manage/positions" render={(props) => <Positions /> } /> 
                    <Route exact path="/manage/employees" render={(props) => <Employees /> } /> 
                    <Route exact path="/manage/recruitment" render={(props) => <Recruitment /> } /> 
                    <Route exact path="/manage/projects" render={(props) => <Projects /> } /> 
                    <Route exact path="/manage/interviews" render={(props) => <Interviews /> } /> 
                    <Route exact path="/manage/invoices" render={(props) => <Invoices /> } /> 
                    <Route exact path="/manage/rota" render={(props) => <Rota /> } /> 
                    <Route exact path="/manage/meeko" render={(props) => <Office /> } /> 
                    <Route exact path="/manage/events" render={(props) => <Events /> } /> 
                    <Route exact path="/manage/equipment" render={(props) => <Equipment /> } /> 
                    <Route exact path="/manage/analytics" render={(props) => <Analytics /> } /> 
                    <Route exact path="/manage/requests" render={(props) => <Requests /> } /> 
                </section>
            </div>
            {display ? <Panel params={params} user_data={user_data} /> : null}
        </main>
    )
}

export default Manage;