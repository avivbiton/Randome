import React, { useState, useCallback } from "react";
import { useInput } from "../Hooks/formInput";
import Input from "./Form/Input";
import Button from "./Form/Button";
import { registerUser } from "../Authentication/auth";
import { Link } from "react-router-dom";
import FirebaseUILogin from "./FirebaseLoginUI";
import { validateSchema } from "../Services/formValidation";
import { registerSchema } from "../schemas";

function RegisterForm({ title }) {

    const [displayName, bindDisplayName] = useInput("");
    const [email, bindEmail] = useInput("");
    const [password, bindPassword] = useInput("", (newValue) => validatePasswordMatch(newValue.target.value, confirmPassword));
    const [confirmPassword, bindConfirmPassword] = useInput("", (newValue) => validatePasswordMatch(password, newValue.target.value));

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    function formSubmitHandler(e) {
        e.preventDefault();
        setLoading(true);

        if (isFormValid() === false) {
            setLoading(false);
            return;
        }

        registerUser({ displayName, email, password })
            .catch(errors => {
                setErrors(errors);
                setLoading(false);
            });
    }

    const removeError = useCallback((errorName) => {
        const newErrors = errors;
        delete newErrors[errorName];
        setErrors(newErrors);
    }, [errors, setErrors]);

    const validatePasswordMatch = (pass, confirm) => {
        if (pass !== confirm) {
            setErrors({ ...errors, confirmPassword: "Passwords do not match." });
            setButtonDisable(true);
        } else {
            setButtonDisable(false);
            removeError("confirmPassword");
        }
    }

    function isFormValid() {
        const errors = validateSchema(registerSchema, { displayName, email, password });
        if (errors.length !== 0) {
            setErrors(errors);
            return false;
        }
        return true;
    }

    return (
        <form onSubmit={formSubmitHandler} className="card shadow" style={{ maxWidth: "325px" }}>
            <h4 className="card-header bg-primary text-white text-center">
                {title}
            </h4>
            <div className="card-body">
                <div className="card-title">
                    {
                        errors.form ?
                            <div className="text-danger">{errors.form}</div> :
                            null
                    }
                </div>
                <Input type="text" className="form-control" placeholder="Display Name"
                    {...bindDisplayName} error={errors.displayName} />
                <Input type="email" className="form-control mt-2" placeholder="Email"
                    {...bindEmail} error={errors.email} />
                <Input type="password" className="form-control mt-2" placeholder="Password"
                    {...bindPassword} error={errors.password} />
                <Input type="password" className="form-control mt-2" placeholder="ConfirmPassword"
                    {...bindConfirmPassword} error={errors.confirmPassword} />
                <Button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-2" loading={isLoading}
                    disabled={buttonDisable || isLoading}>Register</Button>
                <div className="text-muted text-center mt-1">Already have an account? <Link to="/login">Login</Link></div>
            </div>
            <div className="card-footer text-center" style={{ padding: "none" }}>
                <FirebaseUILogin />
            </div>
        </form>
    );
}




export default RegisterForm;