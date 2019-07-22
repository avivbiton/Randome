import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ access, redirect = "/", component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            return (
                access ?
                    <Component {...props} />
                    : <Redirect to={redirect} />
            );
        }} />
    );
};


export default PrivateRoute;