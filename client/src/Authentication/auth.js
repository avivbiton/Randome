import onAuthChanged from "./onAuthChanged";
import axios from "axios";

export function setAuthorizationToken(token) {

    axios.defaults.headers.common["Authorization"] = token;
}

export function initializeAuth() {
    onAuthChanged();

}