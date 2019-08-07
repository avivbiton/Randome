import { setAuthorizationToken, updateProfileState } from "./auth";
import checkForValidAccount from "./checkForAccount";

function updateUserState(user) {

    if (user) {
        updateProfileState(user);
        user.getIdToken().then(token => {
            setAuthorizationToken(token);
            checkForValidAccount();
        });
    } else {
        setAuthorizationToken("");
    }
}

export default updateUserState;