import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

import Input from "../../Form/Input";
import Button from "../../Form/Button";
import PersonalSettings from "./PersonalSettings";
import { changeProfile } from "../../../Authentication/auth";


const labelStyle = {
    fontWeight: "600"
}

export default function SettingsPage() {
    const user = useSelector(state => state.auth.user);
    const [displayName, bindDisplayName] = useInput(user.displayName);
    const [photoURL, bindPhotoURL] = useInput(user.photoURL);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onUpdate = useCallback(() => {
        async function updateProfile() {
            setLoading(true);
            try {
                await changeProfile(displayName, photoURL);
                toastr.success("Your profile has been updated.", "Success", toastrDefault);
                setErrors({});
            } catch (error) {   
                setErrors(error);
            }
            setLoading(false);
        };
        updateProfile();
    }, [displayName, photoURL]);

    return (
        <div className="container-fluid">
            <div className="d-flex flex-column pb-4 pb-2">
                <h3 className="border-bottom pb-2">Public Settings</h3>
                <div className="form-group">
                    <label htmlFor="displayNameInput" style={labelStyle}>Display Name</label>
                    <Input type="text" className="form-control" id="displayNameInput"
                        error={errors.displayName} {...bindDisplayName} />
                </div>
                <div className="form-group">
                    <label htmlFor="PhotoUrlInput" style={labelStyle}>Photo URL</label>
                    <Input type="text" className="form-control" id="PhotoUrlInput"
                        error={errors.photoURL} {...bindPhotoURL} />
                </div>
                <Button type="button" className="btn btn-primary mx-auto"
                    loading={loading}
                    onClick={onUpdate}>
                    Update Profile
                </Button>
            </div>

            <PersonalSettings />
        </div>
    );
}
