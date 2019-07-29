import { setAuthorizationToken, updateProfileState } from "./auth";

function updateUserState(user) {
    if (user) {
        user.getIdToken().then(token => {
            setAuthorizationToken(token);
            updateProfileState(user);
        });
    } else {
        setAuthorizationToken("");
    }
}

export default updateUserState;