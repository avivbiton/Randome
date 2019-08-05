import React, {useEffect } from "react";
import { connect } from "react-redux";
import RegisterForm from "../RegisterForm";
import { redirectOnCondition } from "../../Effects/common";

function RegisterPage({ loggedIn }) {

    useEffect(() => redirectOnCondition(loggedIn), [loggedIn]);

    return (
        <div className="container h-100 d-flex justify-content-center">
            <div className="row">
                <div className="col">
                    <RegisterForm title="Register" />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: !!state.auth.user
});

export default connect(mapStateToProps)(RegisterPage);