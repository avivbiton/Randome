import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { connect } from "react-redux";
import { useInput } from "../../Hooks/useInput";
import { clearErrors } from "../../redux/Actions/errorActions";
import { redirectOnCondition } from "../../Effects/common";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

function LoginPage({ onLogin, errors, clearErrors, hasUser }) {

    const email = useInput("");
    const password = useInput("");

    const [loading, setLoading] = useState(false);

    useEffect(() => redirectOnCondition(hasUser), [hasUser]);

    function onSubmit(e) {
        e.preventDefault();
        clearErrors();
        setLoading(true);
        onLogin(email.value, password.value);
    }

    useEffect(() => {
        setLoading(false);
    }, [errors]);

    return (
        <div className="container h-100 d-flex justify-content-center">
            <form onSubmit={onSubmit} className="card shadow my-auto" style={{ maxWidth: "365px" }}>
                <h4 className="card-header bg-primary text-white text-center">
                    Log In
                </h4>
                <div className="card-body">
                    <Input className="form-control large-input" placeholder="Email"
                        {...email.bind} error={errors.email} />
                    <Input className="form-control large-input mt-4" placeholder="Password"
                        {...password.bind} error={errors.password} />
                    <Button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-4" loading={loading}>Login</Button>
                    <div className="text-muted text-center mt-1">Do not have an account? <Link to="/register">Register here</Link></div>
                </div>
                <div className="card-footer text-center">
                    OR
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </form>
        </div>

    );
}



const mapStateToProps = state => ({
    errors: state.errors,
    hasUser: !!state.auth.user
});

export default connect(mapStateToProps, { clearErrors })(LoginPage);
