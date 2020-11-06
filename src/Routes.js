import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './core/App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ActivateAccount from './auth/Activate';
import Profile from './core/Profile';
import Messenger from './messenger/Default';
import AdminHome from './admin/AdminHome';
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import { PrivateRoute, AdminRoute } from './auth/components/PrivateOrAdminRoute'
import EditableAreaContextProvider from './contexts/EditableAreaContext'
import GlobalContextProvider from './contexts/GlobalContext';
import Blogs from './blog/Blogs';
import AdminBlogs from './admin/AdminBlog'
import BlogLayout from './blog/layouts/BlogLayout'



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
                        <Route path="/admin/blog" exact component={AdminBlogs} />
                        <Route path="/admin/blog/create/:title/:id" exact component={BlogLayout} />
                        <Route path="/blogs" exact component={Blogs} />
                        <PrivateRoute path="/profile" exact component={Profile} />
                        <PrivateRoute path="/messenger" exact component={Messenger} />
                        <AdminRoute path="/admin/home" exact component={AdminHome} />
                    </EditableAreaContextProvider>
                    </GlobalContextProvider>
                </Switch>
            </BrowserRouter>
    );
};

export default Routes;
