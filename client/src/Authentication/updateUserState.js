import { setAuthorizationToken } from "./auth";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";

async function updateUserState(user) {
    if (user) {
        updateProfileState(user);
        const token = await user.getIdToken();
        setAuthorizationToken(token);
        return true;
    } else {
        setAuthorizationToken("");
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

export default updateUserState;