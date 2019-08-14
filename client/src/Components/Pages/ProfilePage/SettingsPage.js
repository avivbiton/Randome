import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";

import Input from "../../Form/Input";
import Button from "../../Form/Button";
import PersonalSettings from "./PersonalSettings";

const labelStyle = {
    fontWeight: "600"
}

export default function SettingsPage() {
    const user = useSelector(state => state.auth.user);
    const [displayName, bindDisplayName] = useInput(user.displayName);
    const [photoURL, bindPhotoURL] = useInput(user.photoURL);

    return (
        <div className="container-fluid">
            <div className="d-flex flex-column pb-4">
                <h3 className="border-bottom pb-2">Public Settings</h3>
                <div className="form-group">
                    <label htmlFor="displayNameInput" style={labelStyle}>Display Name</label>
                    <Input type="text" className="form-control" id="displayNameInput" {...bindDisplayName} />
                </div>
                <div className="form-group">
                    <label htmlFor="PhotoUrlInput" style={labelStyle}>Photo URL</label>
                    <Input type="text" className="form-control" id="PhotoUrlInput" {...bindPhotoURL} />
                </div>
                <Button type="button" className="btn btn-primary mx-auto">Update</Button>
            </div>

            <PersonalSettings />
        </div>
    );
}
