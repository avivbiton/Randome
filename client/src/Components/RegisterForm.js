import React, { useState } from "react";
import { connect } from "react-redux";
import { useInput } from "../Hooks/useInput";
import Input from "./Form/Input";
import { clearErrors } from "../redux/Actions/errorActions";
import Button from "./Form/Button";
import { registerUser } from "../Authentication/auth";

function RegisterForm({ title, errors, clearErrors }) {

    const { value: displayName, bind: bindDisplayName } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

    const [isLoading, setLoading] = useState(false);

    function formSubmitHandler(e) {
        e.preventDefault();
        clearErrors();
        setLoading(true);
        registerUser({ displayName, email, password, confirmPassword }).catch(() => setLoading(false));
    }

    return (
        <form onSubmit={formSubmitHandler} noValidate>
            <div className="card text-center shadow mt-2 mb-4 mt-md-0 ml-auto w-100 w-md-75">
                <h3 className="card-header bg-primary text-white">{title}</h3>
                <div className="card-body">
                    <div className="card-text">
                        <Input type="text" className="form-control large-input"
                            name="displayName" placeholder="Display Name"
                            {...bindDisplayName} error={errors.displayName} />
                        <Input className="form-control large-input mt-3"
                            type="email" name="email" placeholder="Email"
                            {...bindEmail} error={errors.email} />
                        <Input className="form-control large-input mt-3"
                            type="password" name="password" placeholder="Password"
                            {...bindPassword} error={errors.password} />
                        <Input className="form-control large-input mt-3"
                            type="password" name="passwordConfirm" placeholder="Confirm Password"
                            {...bindConfirmPassword} error={errors.confirmPassword} />
                        <Button className="btn btn-primary btn-block mt-3" loading={isLoading}>Register</Button>
                    </div>
                </div>
            </div>
        </form>
    );
}


const mapStateToProps = state => ({
    errors: state.errors
});



export default connect(mapStateToProps, { clearErrors })(RegisterForm);