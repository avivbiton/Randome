import { SET_CURRENT_USER, SET_ACCOUNT, LOGOUT } from "../actionTypes";

export const setCurrentUser = (userPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: userPayload
    };
};

export const setAccount = account => {

    return {
        type: SET_ACCOUNT,
        payload: account
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};