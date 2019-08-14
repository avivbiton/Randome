import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";

import Input from "../../Form/Input";
import Button from "../../Form/Button";

const labelStyle = {
    fontWeight: "600"
}

export default function SettingsPage() {
    
    const user = useSelector(state => state.auth.user);

    return (
        <div className="container-fluid">
            <h1>Your Settings</h1>
            <hr />
            <div className="form-group">
                <label htmlFor="displayNameInput" style={labelStyle}>Display Name</label>
                <Input type="text" className="form-control" id="displayNameInput" value={user.displayName} />
            </div>
        </div>
    );
}
