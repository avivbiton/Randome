import firebase from "firebase/app";
import { setAuthorizationToken, applyAuthState } from "./auth";


function onChange() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(token => {
                setAuthorizationToken(token);
                applyAuthState();
            });
        } else {
            setAuthorizationToken("");
        }
    });
}

export default onChange;