import React, { createContext, useState, useEffect } from "react";
import { listenRealTimeUser } from "../firebase/fetches/Main";
import { auth } from '../firebase/Firebase';
import { get_user_data, get_user_manager, get_user_recruiter } from '../firebase/methods/User_Functions';

export const AuthContext = createContext();
//

export function AuthProvider(props) {
    const [user, set_user] = useState();
    const [user_data, set_user_data] = useState({});
    const [admin, set_admin] = useState(false);
    const [recruiter_ids, set_recruiter_ids] = useState(null);
    const [manager_ids, set_manager_ids] = useState(null);
    const [login_open, set_login_open] = useState(false);
    const [register_open, set_register_open] = useState(false);

    useEffect(() => {
        var unlisten = auth.onAuthStateChanged(async (user) => {
            if(user){
                listenRealTimeUser(set_user_data, set_admin, user.uid)
                set_user(user.uid)   
            } else {
                set_user(null);  
                set_user_data({});       
            }
    })
    }, []);





    return (
        <AuthContext.Provider value={{ user, admin, user_data, manager_ids, recruiter_ids, login_open, set_login_open, register_open, set_register_open }}>
            {props.children}
        </AuthContext.Provider>
    );

}