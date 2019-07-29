import onAuthChanged from "./onAuthChanged";
import axios from "axios";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";
import API from "../API/api";
import firebase from "firebase/app";
import { handleFormErrors } from "../Logic/errorHandler";

export function setAuthorizationToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
}

export function registerUser({ displayName, email, password }) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(creds => {
                creds.user.updateProfile({ displayName: displayName })
                    .then(() => resolve(true))
                    .catch(error => reject(error));
            })
            .catch(errors => {
                handleFormErrors(errors);
            });
    });
}

export function applyAuthState() {
    API.auth.getCurrent()
        .then(data => {
            store.dispatch(setCurrentUser(data));
        })
        .catch(() => removeAuthState());
}

export function removeAuthState() {
    store.dispatch(setCurrentUser(null));
}

export function logOutUser() {
    removeAuthState();
    firebase.auth().signOut();
    window.location = "/";
}

export function initializeAuth() {
    onAuthChanged();

}