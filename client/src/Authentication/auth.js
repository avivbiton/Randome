import updateUserState from "./updateUserState";
import axios from "axios";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";
import firebase from "firebase/app";
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

export function updateProfileState(user) {
    const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    };
    store.dispatch(setCurrentUser(userData));
}

export function removeAuthState() {
    store.dispatch(setCurrentUser(null));
}

export async function logOutUser() {
    removeAuthState();
    await firebase.auth().signOut();
}

export function initializeAuth() {
    const config = {
        apiKey: "AIzaSyCFSriU_52e_TB-SK-8Z2FMuYzTCoAOeag",
        authDomain: "randome-1564044096001.firebaseapp.com",
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(updateUserState);
}