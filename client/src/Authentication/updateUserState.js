import { removeAuthState } from "./auth";
import store from "../redux/store";
import { setCurrentUser } from "../redux/Actions/authAction";

async function updateAuthState(user) {
    if (user) {
        updateProfileState(user);
        return true;
    } else {
        removeAuthState();
        return false;
    }
}


export function updateProfileState(user) {
   
    const userData = {
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        providerId: user.providerData[0].providerId
    };
    store.dispatch(setCurrentUser(userData));
}

export default updateAuthState;