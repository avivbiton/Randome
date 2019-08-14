import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";

import Input from "../../Form/Input";
import Button from "../../Form/Button";

export default function PersonalSettings() {

    const user = useSelector(state => state.auth.user);

    const isPasswordProvider = user.providerId === firebase.auth.EmailAuthProvider.PROVIDER_ID;

    return (
        <fieldset disabled={isPasswordProvider ? "" : "disabled"}>
            <EmailSection />
            <PasswordSection />
            {isPasswordProvider === false ?
                <ThirdPartyNotice providerId={user.providerId} /> : null
            }
        </fieldset>
    );
}


function ThirdPartyNotice({ providerId }) {
    return (
        <p className="text-muted mt-2">
            You can not change your Email / Password when logging in with third party provider (Like: Google or Facebook)
            Refer to your provider website to change your Password / Email.
            <br />
            <span className="lead">Your Provide Is: {providerId}</span>
        </p>
    );
}

function PasswordSection() {

    const [oldPassword, bindOldPassword] = useInput();
    const [newPassword, bindNewPassword] = useInput();
    const [confirmPassword, bindConfirmPassword] = useInput();

    return (
        <div className="d-flex flex-column">

            <h3 className="border-bottom pb-2">Change Password</h3>
            <div className="form-group">
                <label htmlFor="oldPasswordInput">Old Password</label>
                <Input type="password" className="form-control" id="oldPasswordInput" {...bindOldPassword} />
            </div>
            <div className="form-group">
                <label htmlFor="newPasswordInput">New Password</label>
                <Input type="password" className="form-control" id="newPasswordInput" {...bindNewPassword} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPasswordInput">Confirm New Password</label>
                <Input type="password" className="form-control" id="confirmPasswordInput" {...bindConfirmPassword} />
            </div>
            <Button type="button" className="btn btn-primary mx-auto">Change Password</Button>

        </div>
    );
}

function EmailSection() {

    const [password, bindPassword] = useInput();
    const [email, bindEmail] = useInput();
    const [confirmEmail, bindConfirmEmail] = useInput();

    return (
        <div className="d-flex flex-column">
            <h3 className="border-bottom pb-2">Change Email</h3>
            <div className="form-group">
                <label htmlFor="oldPasswordInput">Password</label>
                <Input type="password" className="form-control" id="oldPasswordInput" placeholder="Verify your password"
                    {...bindPassword} />
            </div>
            <div className="form-group">
                <label htmlFor="oldPasswordInput">New Email</label>
                <Input type="email" className="form-control" id="oldPasswordInput" {...bindEmail} />
            </div>
            <div className="form-group">
                <label htmlFor="newPasswordInput">Confirm New Email</label>
                <Input type="email" className="form-control" id="newPasswordInput" {...bindConfirmEmail} />
            </div>
            <Button type="button" className="btn btn-primary mx-auto">Change Email</Button>
        </div>
    );
}