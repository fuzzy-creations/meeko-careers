import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/main.scss';

import Landing from './pages/Landing';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Portfolio from './pages/Portfolio';
import Manage from './pages/Manage';
import Navigation from './components/UI/Navigation';
import Loader_Page from './components/UI/Loader_Page';

import { AuthContext } from './contexts/Auth.context';


function Router(){  
    const { user, user_data } = useContext(AuthContext);

    const app = user === undefined || user_data === undefined ? ( <Loader_Page /> ) : (
        <>
        <Navigation />
        <Switch>     
            <Route exact path="/" render={(props) => <Landing {...props} /> } /> 
            <Route exact path="/jobs" render={(props) => <Jobs {...props} /> } /> 
            <Route exact path="/dashboard" render={(props) => <Dashboard user_data={user_data} {...props} /> } /> 
            <Route exact path="/manage" render={(props) => <Manage user_data={user_data} {...props} /> } /> 
            <Route exact path="/manage/:type" render={(props) => <Manage user_data={user_data} {...props} /> } /> 
            <Route exact path="/manage/:type/:id" render={(props) => <Manage user_data={user_data} {...props} /> } /> 
            <Route exact path="/dashboard/:type" render={(props) => <Dashboard user_data={user_data} {...props} /> } />  
            <Route exact path="/portfolio" render={(props) => <Portfolio user_data={user_data} {...props} /> } /> 
            <Route render={() => <Error404 /> } />
        </Switch>
        </>
    )

    return app;

};

export default Router;