import React from "react";
import RegisterForm from "../RegisterForm";

function RegisterPage() {
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

export default RegisterPage;