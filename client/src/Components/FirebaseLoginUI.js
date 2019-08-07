import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import uiConfig from "../uiConfig";

export default function FirebaseLoginUI() {
    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
}
