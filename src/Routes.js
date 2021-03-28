import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './core/App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ActivateAccount from './auth/Activate';
import Profile from './core/Profile';
import Messenger from './messenger/Default';
import AdminHome from './admin/AdminHome';
import AdminMenu from './admin/AdminMenu';
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import { PrivateRoute, AdminRoute } from './auth/components/PrivateOrAdminRoute'
import EditableAreaContextProvider from './contexts/EditableAreaContext'
import AnimatedBannerContextProvider from './contexts/AnimatedBannerContext'
import GlobalContextProvider from './contexts/GlobalContext';
import Blogs from './blog/Blogs';
import Shop from './shop/Shop';
import AdminBlogs from './admin/AdminBlog'
import BlogLayout from './blog/layouts/BlogLayout'
import EditablePage from './core/EditablePage'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './assets/css/Style.css'
import EditableArea from './core/components/EditableArea';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Lobster',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    }
});

const Routes = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalContextProvider>
                    <EditableAreaContextProvider>
                        <AnimatedBannerContextProvider>
                            <Switch>
                                <Route path="/" exact component={App} />
                                <Route path="/signup" exact component={Signup} />
                                <Route path="/signin" exact component={Signin} />
                                <Route path="/auth/activate/:token" exact component={ActivateAccount} />
                                <Route path="/auth/password/forgot" exact component={Forgot} />
                                <Route path="/auth/password/reset/:token" exact component={Reset} />
                                <Route path="/blogs" exact component={Blogs} />
                                <Route path="/shop" exact component={Shop} />
                                <PrivateRoute path="/profile" exact component={Profile} />
                                <PrivateRoute path="/messenger" exact component={Messenger} />
                                <AdminRoute path="/admin/home" exact component={AdminHome} />
                                <AdminRoute path="/admin/menu" exact component={AdminMenu} />
                                <AdminRoute path="/admin/blog" exact component={AdminBlogs} />
                                <AdminRoute path="/admin/blog/create/:title/:id" exact component={BlogLayout} />
                                {/* for any page with a param, render editable page */}
                                <Route path="/:page" exact component={EditablePage} />
                            </Switch>
                        </AnimatedBannerContextProvider>
                    </EditableAreaContextProvider>
                </GlobalContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default Routes;
