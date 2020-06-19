import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './Helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={
        props => isAuth() ? <Component {...props} /> : <Redirect to={{
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
