import { setAuthorizationToken, removeAuthState } from "./auth";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";

async function updateAuthState(user) {
    if (user) {
        updateProfileState(user);
        setAuthorizationToken(user);
        return true;
    } else {
        removeAuthState();
        return false;
    }
}


export function updateProfileState(user) {
   
    const userData = user.providerData[0];
    store.dispatch(setCurrentUser(userData));
}

export default updateAuthState;