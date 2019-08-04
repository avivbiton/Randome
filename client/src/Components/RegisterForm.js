import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useInput } from "../Hooks/useInput";
import Input from "./Form/Input";
import { clearErrors, pushManyErrors, pushError, removeError } from "../redux/Actions/errorActions";
import Button from "./Form/Button";
import { registerUser } from "../Authentication/auth";
import { validateRegisterForm } from "../Logic/formValidation";
import { Link } from "react-router-dom";
import FirebaseUILogin from "./FirebaseLoginUI";

function RegisterForm({ title, errors, clearErrors, pushManyErrors, pushError, removeError }) {

    const { value: displayName, bind: bindDisplayName } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

    const [isLoading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    function formSubmitHandler(e) {
        e.preventDefault();
        clearErrors();

        setLoading(true);
        const foundErrors = validateRegisterForm({ displayName });
        if (foundErrors.length !== 0) {
            pushManyErrors(foundErrors);
            setLoading(false);
            return;
        }
        registerUser({ displayName, email, password, confirmPassword }).catch(() => setLoading(false));
    }


    function validatePasswordMatch() {
        if (password !== confirmPassword) {
            pushError({ name: "confirmPassword", message: "Passwords do not match." });
            setButtonDisable(true);
        } else {
            setButtonDisable(false);
            removeError("confirmPassword");
        }
    }


    useEffect(() =>
        validatePasswordMatch()
        , [password, confirmPassword]);


    return (
        <form onSubmit={formSubmitHandler} className="card shadow my-auto" style={{ maxWidth: "365px" }}>
            <h4 className="card-header bg-primary text-white text-center">
                {title}
            </h4>
            <div className="card-body">
                <div className="card-title">
                    {
                        errors.UNKOWN ?
                            <div className="text-danger">{errors.UNKOWN}</div> :
                            null
                    }
                </div>
                <Input type="text" className="form-control large-input" placeholder="Display Name"
                    {...bindDisplayName} error={errors.displayName} />
                <Input type="email" className="form-control large-input mt-4" placeholder="Email"
                    {...bindEmail} error={errors.email} />
                <Input type="password" className="form-control large-input mt-4" placeholder="Password"
                    {...bindPassword} error={errors.password} />
                <Input type="password" className="form-control large-input mt-4" placeholder="ConfirmPassword"
                    {...bindConfirmPassword} error={errors.confirmPassword} />
                <Button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-4" loading={isLoading}
                    disabled={buttonDisable || isLoading}>Register</Button>
                <div className="text-muted text-center mt-1">Already have an account? <Link to="/login">Login</Link></div>
            </div>
            <div className="card-footer text-center">
                OR
                <FirebaseUILogin />
            </div>
        </form>
    );
}


const mapStateToProps = state => ({
    errors: state.errors,
    loggedIn: !!state.auth.user
});



export default connect(mapStateToProps, { clearErrors, pushError, pushManyErrors, removeError })(RegisterForm);