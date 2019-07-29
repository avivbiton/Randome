import React, { useState } from "react";
import { useInput } from "../Hooks/useInput";
import Input from "./Form/Input";

function RegisterForm({ title, onRegister }) {

    const { value: displayName, bind: bindDisplayName } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

    const [errors] = useState({});


    function formSubmitHandler(e) {
        e.preventDefault();


        onRegister({ displayName, email, password, confirmPassword });
    }

    return (
        <form onSubmit={formSubmitHandler} noValidate>
            <div className="card text-center shadow mt-2 mb-4 mt-md-0 ml-auto w-100 w-md-75">
                <h3 className="card-header bg-primary text-white">{title}</h3>
                <div className="card-body">
                    <div className="card-text">
                        <input type="text" className="form-control large-input"
                            name="displayName" placeholder="Display Name" {...bindDisplayName} />
                        <input className="form-control large-input mt-3"
                            type="email" name="email" placeholder="Email" {...bindEmail} />
                        <Input className="form-control large-input mt-3"
                            type="password" name="password" placeholder="Password"
                            {...bindPassword} error={errors.password} />
                        <Input className="form-control large-input mt-3"
                            type="password" name="passwordConfirm" placeholder="Confirm Password"
                            {...bindConfirmPassword} error={errors.confirmPassword} />
                        <button className="btn btn-primary btn-block mt-3">Register</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;