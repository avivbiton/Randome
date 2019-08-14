import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ access = false, redirect = "/login", component: Component, requireLogin = false, isLoggedIn, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            return (
                access || (requireLogin && isLoggedIn) ?
                    <Component {...props} />
                    : <Redirect to={redirect} />
            );
        }} />
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.user
});

export default connect(mapStateToProps)(PrivateRoute);