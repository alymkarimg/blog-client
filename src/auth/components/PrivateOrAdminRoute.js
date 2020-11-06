import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../helpers/Default';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={
        // if is auth, render <Component/> otherwise render <Redirect/>
            // render the component with the same props as the PrivateRouteComponent in Routes.js
        props => isAuth() ? 
        <Component {...props} /> : 
        <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
        }} />
    }>
    </Route>
);

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            props => isAuth() && isAuth().category.title === 'admin' ? <Component {...props} /> : <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
        }>
        </Route>
    )
};

export { PrivateRoute, AdminRoute };
