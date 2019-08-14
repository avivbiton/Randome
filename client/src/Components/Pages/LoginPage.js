import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { connect } from "react-redux";
import { useInput } from "../../Hooks/formInput";
import FirebaseLoginUI from "../FirebaseLoginUI";
import useReactRouter from "use-react-router";

function LoginPage({ onLogin, loggedIn }) {

    const [email, bindEmail] = useInput("");
    const [password, bindPassword] = useInput("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { history } = useReactRouter();

    useEffect(() => {
        if (loggedIn)
            history.push("/");
    }, [loggedIn, history]);

    function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        onLogin(email, password)
            .catch(errors => {
                setLoading(false);
                setErrors(errors);
            });
    }

    return (
        <div className="container h-100 d-flex justify-content-center">
            <form onSubmit={onSubmit} className="card shadow my-auto" style={{ maxWidth: "365px" }}>
                <h4 className="card-header bg-primary text-white text-center">
                    Log In
                </h4>
                <div className="card-body">
                    <div className="card-title">
                        {
                            errors.form ?
                                <div className="text-danger">{errors.form}</div> :
                                null
                        }
                    </div>
                    <Input type="email" className="form-control large-input" placeholder="Email"
                        {...bindEmail} error={errors.email} />
                    <Input type="password" className="form-control large-input mt-4" placeholder="Password"
                        {...bindPassword} error={errors.password} />
                    <Button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-4" loading={loading}>Login</Button>
                    <div className="text-muted text-center mt-1">Do not have an account? <Link to="/register">Register here</Link></div>
                </div>
                <div className="card-footer text-center">
                    OR
                    <FirebaseLoginUI />
                </div>
            </form>
        </div>

    );
}



const mapStateToProps = state => ({
    loggedIn: !!state.auth.user
});

export default connect(mapStateToProps)(LoginPage);
