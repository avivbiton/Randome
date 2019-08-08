import { SET_CURRENT_USER, SET_ACCOUNT, LOGOUT } from "../actionTypes";
const initState = {
    user: null,
    account: null
};

export default function (state = initState, action) {

    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                account: action.payload
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                account: null
            };
        default:
            return state;
    }
}