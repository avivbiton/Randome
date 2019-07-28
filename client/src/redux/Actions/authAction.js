import { SET_CURRENT_USER } from "../actionTypes";

export const setCurrentUser = (userPayload) => {
    return {
        type: SET_CURRENT_USER,
        payload: userPayload
    };
};