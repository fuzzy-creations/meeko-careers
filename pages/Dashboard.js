import styles from '../styles/pages/Dashboard.module.scss';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import Nav from '../components/UI/Nav';
import Panel from '../components/dashboard/Panel';
import { Route, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProfileContext } from '../contexts/Profile.context';
import Loader_Dash from '../components/UI/Loader_Dash';
import Rota from './Dashboard/Rota';
import Applications from './Dashboard/Applications';
import Invoices from './Dashboard/Invoices';
import Interviews from './Dashboard/Interviews';
import Projects from './Dashboard/Projects';
import Offers from './Dashboard/Offers';
import Office from './Dashboard/Office';
import Events from './Dashboard/Events';
import Equipment from './Dashboard/Equipment';
import Home from './Dashboard/Home';



function Dashboard (props) {
    const params = props.match.params.type;
    const { user_data } = useContext(AuthContext);
    const { loader } = useContext(ProfileContext);
    const [display, set_display] = useState(true);

    if(loader) { return <Loader_Dash /> }


    return (
        <main className={`${styles.dashboard} ${display === false ? styles.dashboard__hidden : null}`}>
            <div onClick={() => set_display(!display)} className={styles.operator}>{display ? <FaChevronRight /> : <FaChevronLeft />}</div>
            <div className={styles.container}>
                <Nav />
                <section className={styles.main}>
                    <Route exact path="/dashboard" render={(props) => <Home /> } /> 
                    <Route exact path="/dashboard/applications" render={(props) => <Applications /> } />
                    <Route exact path="/dashboard/interviews" render={(props) => <Interviews /> } /> 
                    <Route exact path="/dashboard/projects" render={(props) => <Projects /> } /> 
                    <Route exact path="/dashboard/offers" render={(props) => <Offers /> } /> 
                    <Route exact path="/dashboard/invoices" render={(props) => <Invoices /> } /> 
                    <Route exact path="/dashboard/rota" render={(props) => <Rota /> } /> 
                    <Route exact path="/dashboard/meeko" render={(props) => <Office /> } /> 
                    <Route exact path="/dashboard/events" render={(props) => <Events /> } /> 
                    <Route exact path="/dashboard/equipment" render={(props) => <Equipment /> } /> 
                </section>
            </div>
            {display ? <Panel params={params} user_data={user_data} /> : null}
        </main>
    )
}

export default Dashboard;


