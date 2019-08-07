import { setAuthorizationToken, updateProfileState } from "./auth";

function updateUserState(user) {

    if (user) {
        updateProfileState(user);
        user.getIdToken().then(token => {
            setAuthorizationToken(token);
        });
    } else {
        setAuthorizationToken("");
    }
}

export default updateUserState;