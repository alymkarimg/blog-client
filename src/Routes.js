import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ActivateAccount from './auth/Activate';
import Profile from './core/Profile';
import AdminHome from './core/AdminHome';
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import { PrivateRoute, AdminRoute } from './auth/PrivateAdminRoute'
import EditableAreaContextProvider from './contexts/EditableAreaContext'
import GlobalContextProvider from './contexts/GlobalContext';
import Blogs from './core/Blogs';




const Routes = () => {
    return (
            <BrowserRouter>
                <Switch>
                    <GlobalContextProvider>
                    <EditableAreaContextProvider>
                        <Route path="/" exact component={App} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/signin" exact component={Signin} />
                        <Route path="/auth/activate/:token" exact component={ActivateAccount} />
                        <Route path="/auth/password/forgot" exact component={Forgot} />
                        <Route path="/auth/password/reset/:token" exact component={Reset} />
                        <Route path="/admin/blog" exact component={Blogs} />
                        <PrivateRoute path="/profile" exact component={Profile} />
                        <AdminRoute path="/admin/home" exact component={AdminHome} />
                    </EditableAreaContextProvider>
                    </GlobalContextProvider>
                </Switch>
            </BrowserRouter>
    );
};

export default Routes;
