import React, { createContext, useState, useEffect, useContext } from "react";
import { listenRealTimeApplications, listenRealTimeInterviews, listenRealTimeInvoices, listenRealTimeJobs, listenRealTimeRota } from "../firebase/fetches/Dashboard";
import { listenRealTimeCompanies, listenRealTimePosts } from "../firebase/fetches/Manage";
import { db, auth } from '../firebase/Firebase';
import { get_applicant_messages, get_applicant_tasks, get_applications, get_application_interviews, get_interviews, get_post_applicants } from "../firebase/methods/Applicant_Functions";
import { get_company, get_company_messages, get_company_rota, get_company_tasks, get_managements } from "../firebase/methods/Company_Functions";
import { get_company_employees, get_employee_messages, get_employee_tasks, get_employements } from "../firebase/methods/Employee_Functions";
import { get_position } from "../firebase/methods/Position_Functions";
import { get_companies_posts, get_post, get_post_messages, get_post_tasks, get_recruiters, get_recruitments } from "../firebase/methods/Post_Functions";
import { get_user_data } from '../firebase/methods/User_Functions';
import { AuthContext } from './Auth.context';

export const ProfileContext = createContext();

export function ProfileProvider(props) {
    const { user } = useContext(AuthContext)
    const [applications, set_applications] = useState([]);
    const [interviews, set_interviews] = useState([]);
    const [rota, set_rota] = useState([]);
    const [invoices, set_invoices] = useState([]);
    const [jobs, set_jobs] = useState(null);
    const [offers, set_offers] = useState(null);
    const [loader, set_loader] = useState(true);

    const [profile, set_profile] = useState(false);

    
    useEffect(() => {
        const fetch_data = async () => {
            const unlistenApplications = listenRealTimeApplications(set_applications, user);
            const unlistenJobs = listenRealTimeJobs(set_profile, set_jobs, set_offers, user);
            const unlistenInterviews = listenRealTimeInterviews(set_interviews, user);
            const unlistenInvoices = listenRealTimeInvoices(set_invoices, user);
        };
        if(user) { fetch_data(); }
        
    }, [user]);


    if(applications !== null && jobs !== null && offers !== null && loader) { set_loader(false) }

    // const filter = (array) => selected === false ? array : array.filter(item => item.employee_id === selected);

    return (
        <ProfileContext.Provider value={{ loader, applications, interviews, invoices, jobs, offers, profile }}>
            {props.children}
        </ProfileContext.Provider>
    );

}