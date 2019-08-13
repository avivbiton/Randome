import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import updateAuthState from "../Authentication/updateUserState";
import checkForValidAccount from "../Authentication/checkForAccount";
import fetchAccountInfo from "../Authentication/fetchAccountInfo";

const config = {
    apiKey: "AIzaSyCFSriU_52e_TB-SK-8Z2FMuYzTCoAOeag",
    authDomain: "randome-1564044096001.firebaseapp.com",
};
firebase.initializeApp(config);
export const useAuth = () => {

    const [state, setState] = useState({ initializing: true });

    async function onChange(user) {
        const loggedIn = await updateAuthState(user);
        if (loggedIn) {
            await checkForValidAccount();
            await fetchAccountInfo();
        }
        setState({ initializing: false });
    }

    useEffect(() => {
        const onAuthChange = firebase.auth().onAuthStateChanged(onChange);
        return () => {
            onAuthChange();
        };
    }, []);

    return state;
};