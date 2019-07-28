import firebase from "firebase";
import { setAuthorizationToken } from "./auth";
import API from "../API/api";

function onChange() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(token => {
                setAuthorizationToken(token);
                API.auth.getCurrent()
                    .then(data => {
                        console.log(data);
                    }).catch(error =>
                        console.log(error));
            });
        } else {
            setAuthorizationToken("");
        }
    });
}

export default onChange;