import updateUserState from "./updateUserState";
import axios from "axios";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";
import API from "../API/api";
import firebase from "firebase/app";
import { handleFormErrors } from "../Logic/errorHandler";
import transformError from "../firebase/transformError";

export function setAuthorizationToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
}

export function registerUser({ displayName, email, password }) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(creds => {
                creds.user.updateProfile({ displayName: displayName, photoURL: "/favicon.ico" })
                    .then(() => {
                        updateProfileState(firebase.auth().currentUser);
                        resolve();
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
            .catch(error => {
                handleFormErrors(transformError(error));
                reject(error);
            });
    });
}

export function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location = "/";
                resolve();
            })
            .catch(error => {
                handleFormErrors(transformError(error));
                reject();
            });
    });
}

export function updateProfileState(user) {
    const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    }
    store.dispatch(setCurrentUser(userData));
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
    firebase.auth().onAuthStateChanged(updateUserState);
}