import React, { createContext, useState, useEffect, useContext } from "react";
import { listenRealTimeApplications, listenRealTimeCompanies, listenRealTimeEmployees, listenRealTimeInterviews, listenRealTimeInvoices, listenRealTimePositions, listenRealTimePosts, listenRealTimeRota, listenRealTimeUsers } from "../firebase/fetches/Manage";
import { AuthContext } from './Auth.context';

export const ManageContext = createContext();

export function ManageProvider(props) {
    const { admin } = useContext(AuthContext)
    const [companies, set_companies] = useState(null);
    const [selected_company, set_selected_company] = useState(false);

    const [users, set_users] = useState(null);
    const [applications, set_applications] = useState(null);
    const [employees, set_employees] = useState(null);
    const [posts, set_posts] = useState(null);
    const [positions, set_positions] = useState(null);
    const [interviews, set_interviews] = useState(null);
    const [rota, set_rota] = useState(null);
    const [invoices, set_invoices] = useState(null);
    
    
    const [loader, set_loader] = useState(true);

    useEffect(() => {
        const fetch_data = async () => {
            
            const unlistenUsers = listenRealTimeUsers(set_users);
            const unlistenEmployees = listenRealTimeEmployees(set_employees);
            const unlistenApplications = listenRealTimeApplications(set_applications);
            const unlistenCompanies = listenRealTimeCompanies(set_companies);
            const unlistenPositions = listenRealTimePositions(set_positions);
            const unlistenPosts = listenRealTimePosts(set_posts);
            const unlistenInterviews = listenRealTimeInterviews(set_interviews);
            const unlistenInvoices = listenRealTimeInvoices(set_invoices);
            const unlistenRota = listenRealTimeRota(set_rota);

        };
        if(admin) { fetch_data(); }
        
    }, [admin]);


    const filter = (array) => selected_company === false ? array : array.filter(item => item.company_id === selected_company);
    


    console.log(posts)
    
    if(companies !== null && positions !== null && applications !== null && employees !== null && posts !== null && interviews !== null && invoices !== null && rota !== null && loader) { set_loader(false) }


    return (
        <ManageContext.Provider value={{ 
            loader, 
            profile: selected_company ? companies.find(item => item.id === selected_company) : false,
            set_selected_company,
            companies,
            applications,
            employees: filter(employees),
            users,
            positions: filter(positions),
            posts: filter(posts),
            interviews: filter(interviews),
            invoices: filter(invoices),
            rota: filter(rota) 
        }}>
            {props.children}
        </ManageContext.Provider>
    );

}