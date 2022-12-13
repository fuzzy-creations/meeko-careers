import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import Router from './Router';

import { AuthProvider } from './contexts/Auth.context';
import { NotificationProvider } from './contexts/Notification.context';
import { ProfileProvider } from './contexts/Profile.context';
import { ManageProvider } from './contexts/Manage.context';


function App(){  

    return (
        <AuthProvider>
            <ProfileProvider>
                <ManageProvider>
                        <NotificationProvider>
                            <BrowserRouter>
                                <Router />
                            </BrowserRouter>
                        </NotificationProvider>
                </ManageProvider>
            </ProfileProvider>
        </AuthProvider>
    );

};

export default App;