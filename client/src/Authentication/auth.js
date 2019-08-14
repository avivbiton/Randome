import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/Actions/authAction";
import firebase from "firebase/app";
import "firebase/auth";

import transformError from "../firebase/transformError";
import { updateProfileState } from "./updateUserState";

let currentAuthInterceptor = null;

export function setAuthorizationToken(user) {
    currentAuthInterceptor = axios.interceptors.request.use(async function (config) {
        config.headers["Authorization"] = await user.getIdToken();
        return config;
    });
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
    if (currentAuthInterceptor !== null) {
        axios.interceptors.request.eject(currentAuthInterceptor);
        currentAuthInterceptor = null;
    }
}

export async function logOutUser() {

    removeAuthState();
    await firebase.auth().signOut();
    window.location = "/";
}

export async function changePassword(oldPassword, newPassword) {
    try {
        await reauthenticateUser(oldPassword);
        await firebase.auth().currentUser.updatePassword(newPassword);
        updateProfileState(firebase.auth().currentUser)
    } catch (error) {
        throw transformError(error, {
            "auth/weak-password": "newPassword"
        });
    }
}

export async function changeEmail(password, newEmail) {
    try {
        await reauthenticateUser(password);
        await firebase.auth().currentUser.updateEmail(newEmail);
        updateProfileState(firebase.auth().currentUser)
    } catch (error) {
        throw transformError(error);
    }
}


async function reauthenticateUser(password) {
    const currentUser = firebase.auth().currentUser;
    return await currentUser
        .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, password));
}
