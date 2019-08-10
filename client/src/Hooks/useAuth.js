import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import updateUserState from "../Authentication/updateUserState";
import checkForValidAccount from "../Authentication/checkForAccount";
import fetchAccountInfo from "../Authentication/fetchAccountInfo";

const config = {
    apiKey: "AIzaSyCFSriU_52e_TB-SK-8Z2FMuYzTCoAOeag",
    authDomain: "randome-1564044096001.firebaseapp.com",
};
firebase.initializeApp(config);
export const useAuth = () => {

    const [state, setState] = useState(() => {
        return { initializing: true };
    });

    async function onChange(user) {
        await updateUserState(user);
        await checkForValidAccount();
        await fetchAccountInfo();

        setState({ initializing: false });
    }

    useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    return state;
};