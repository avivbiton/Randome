import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/Actions/authAction";
import firebase from "firebase/app";
import "firebase/auth";

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
                        resolve();
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
            .catch(error => {
                reject(transformError(error));
            });
    });
}

export function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(transformError(error));
            });
    });
}

export function removeAuthState() {
    store.dispatch(logout());
}

export async function logOutUser() {
    removeAuthState();
    await firebase.auth().signOut();
    window.location = "/";
}
