import React, { useState, useMemo, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";

import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { changePassword, changeEmail } from "../../../Authentication/auth";

export default function PersonalSettings() {
    const user = useSelector(state => state.auth.user);
    const isPasswordProvider = user.providerId === firebase.auth.EmailAuthProvider.PROVIDER_ID;

    return (
        <fieldset disabled={isPasswordProvider ? "" : "disabled"}>
            {isPasswordProvider === false ?
                <ThirdPartyNotice providerId={user.providerId} /> : null
            }
            <EmailSection />
            <PasswordSection />
        </fieldset>
    );
}


function ThirdPartyNotice({ providerId }) {
    return (
        <p className="mt-2 border shadow-sm p-3 bg-white">
            You can not change your Email / Password when logging in with third party provider (Like: Google or Facebook)
            Refer to your provider website to change your Password / Email.
            <br />
            <span className="lead">Your Provider Is: {providerId}</span>
        </p>
    );
}

function PasswordSection() {

    const [oldPassword, bindOldPassword, setOldPassword] = useInput();
    const [newPassword, bindNewPassword, setNewPassword] = useInput();
    const [confirmPassword, bindConfirmPassword, setConfrimPassword] = useInput();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const resetForm = useCallback(() => {
        setOldPassword("");
        setNewPassword("");
        setConfrimPassword("");
        setErrors({});
    }, [setOldPassword, setNewPassword, setConfrimPassword, setErrors]);

    const onUpdatePressed = useCallback(() => {
        async function updatePassword() {
            setLoading(true);
            try {
                await changePassword(oldPassword, newPassword);
                resetForm();
                toastr.success("Your password has changed", "Success", toastrDefault);
            } catch (error) {
                setErrors(error);
            }

            setLoading(false);
        }
        updatePassword();
    }, [oldPassword, newPassword, resetForm]);

    const passwordsMatch = useMemo(() => {
        if (newPassword === confirmPassword) {
            if (errors.confirmPassword) {
                delete errors.confirmPassword;
                setErrors({ ...errors });
            }
            return true;
        } else {
            if (!errors.confirmPassword) {
                setErrors({ ...errors, confirmPassword: "Passwords do not match." });
            }
            return false;
        }
    }, [newPassword, confirmPassword, setErrors, errors]);


    return (
        <div className="d-flex flex-column">
            <h3 className="border-bottom pb-2">Change Password</h3>
            {
                errors.form ?
                    <div className="text-danger">{errors.form}</div> :
                    null
            }
            <div className="form-group">
                <label htmlFor="oldPasswordInput">Old Password</label>
                <Input type="password" className="form-control" id="oldPasswordInput" {...bindOldPassword}
                    error={errors.password} />
            </div>
            <div className="form-group">
                <label htmlFor="newPasswordInput">New Password</label>
                <Input type="password" className="form-control" id="newPasswordInput" {...bindNewPassword}
                    error={errors.newPassword} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPasswordInput">Confirm New Password</label>
                <Input type="password" className="form-control" id="confirmPasswordInput" {...bindConfirmPassword}
                    error={errors.confirmPassword} />
            </div>
            <Button type="button" className="btn btn-primary mx-auto"
                onClick={onUpdatePressed}
                loading={loading}
                disabled={loading || !passwordsMatch}>
                Change Password
            </Button>

        </div>
    );
}

function EmailSection() {

    const [password, bindPassword, setPassword] = useInput();
    const [email, bindEmail, setEmail] = useInput();
    const [confirmEmail, bindConfirmEmail, setConfirmEmail] = useInput();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const resetForm = useCallback(() => {
        setPassword("");
        setEmail("");
        setConfirmEmail("");
        setErrors({});
    }, [setPassword, setEmail, setConfirmEmail, setErrors]);


    const onUpdatePressed = useCallback(() => {
        async function updateEmail() {
            setLoading(true);
            try {
                await changeEmail(password, email);
                resetForm();
                toastr.success("Your Email address has changed", "Success", toastrDefault);
            } catch (error) {
                setErrors(error);
            }

            setLoading(false);
        };
        updateEmail();
    }, [password, email, resetForm]);


    const emailsMatch = useMemo(() => {
        if (email === confirmEmail) {
            if (errors.confirmEmail) {
                delete errors.confirmEmail;
                setErrors({ ...errors });
            }
            return true;
        } else {
            if (!errors.confirmEmail) {
                setErrors({ ...errors, confirmEmail: "Emails do not match." });
            }
            return false;
        }

    }, [email, confirmEmail, errors, setErrors]);

    return (
        <div className="d-flex flex-column pb-2">
            <h3 className="border-bottom pb-2">Change Email</h3>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <Input type="password" className="form-control" id="passwordInput" placeholder="Verify your password"
                    {...bindPassword}
                    error={errors.password} />
            </div>
            <div className="form-group">
                <label htmlFor="newEmailInput">New Email</label>
                <Input type="email" className="form-control" id="newEmailInput" {...bindEmail}
                    error={errors.email} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmEmailInput">Confirm New Email</label>
                <Input type="email" className="form-control" id="confirmEmailInput" {...bindConfirmEmail}
                    error={errors.confirmEmail} />
            </div>
            <Button type="button" className="btn btn-primary mx-auto"
                loading={loading}
                disabled={loading || !emailsMatch}
                onClick={onUpdatePressed}>Change Email</Button>
        </div>
    );
}