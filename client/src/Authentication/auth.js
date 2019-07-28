import onAuthChanged from "./onAuthChanged";
import axios from "axios";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";
import API from "../API/api";

export function setAuthorizationToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
}

export function applyAuthState() {
    API.auth.getCurrent()
        .then(data => {
            store.dispatch(setCurrentUser(data));
        })
        .catch(() => removeAuthState());
}

export function removeAuthState() {
    store.disptach(setCurrentUser(null));
}

export function initializeAuth() {
    onAuthChanged();

}