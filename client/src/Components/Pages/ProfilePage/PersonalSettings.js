import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../../Hooks/formInput";

import Input from "../../Form/Input";
import Button from "../../Form/Button";

export default function PersonalSettings() {

    return (
        <div>

        </div>
    );
}


function ThirdPartyNotice() {
    return ( 
        <p className="lead">
            Please use your sign in method you change your Password / Email address.
        </p>
    );
}

function PasswordSection() {
    return (
        <div className="d-flex flex-column">
            <h3 className="border-bottom pb-2">Password</h3>
            <div className="form-group">
                <label htmlFor="displayNameInput">Display Name</label>
                <Input type="text" className="form-control" id="displayNameInput"  />
            </div>
            <div className="form-group">
                <label htmlFor="PhotoUrlInput">Photo URL</label>
                <Input type="text" className="form-control" id="PhotoUrlInput"  />
            </div>
            <Button type="button" className="btn btn-primary mx-auto">Update</Button>
        </div>
    );
}

function EmailSection() {

}