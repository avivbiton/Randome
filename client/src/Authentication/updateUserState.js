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


function updateProfileState(user) {
    const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    };
    store.dispatch(setCurrentUser(userData));
}

export default updateAuthState;