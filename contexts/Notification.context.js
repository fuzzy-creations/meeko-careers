import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from '../firebase/Firebase';
import { open_message, open_requests, read_notes, read_notes_types } from '../firebase/methods/Notification_Functions';
import { AuthContext } from './Auth.context';


export const NotificationContext = createContext();

export function NotificationProvider(props) {
    const { user, recruiter_data, manager_data } = useContext(AuthContext)
    const [notifications, set_notifications] = useState([]);
    const [unread_notes, set_unread_notes] = useState(0);
    const [display_notes, set_display_notes] = useState(false);


    useEffect(() => {
        async function fetchData(){
            db.collection("users").doc(user).collection("notifications").orderBy('created', 'desc').onSnapshot(async (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => {
                    return {note_id: doc.id, ...doc.data()}
                });
                set_notifications(data);
                set_unread_notes(unread_filter(data));

            });
        }
        if(user){
            fetchData()
        }
    }, [user])


    const unread_filter = notes => notes.filter(note => note.is_read === false).length
    
    const unopened_filter = notes => notes.filter(note => note.opened === false);

        
    const read_notes_handler = () => {
        read_notes(user);
        set_unread_notes(0);
    };


    return (
    <NotificationContext.Provider value={{
        notifications, 
        display_notes,
        set_display_notes,
        unread_notes, 
        read_notes_handler, 
        }}>
        {props.children}
    </NotificationContext.Provider>
    );
}
