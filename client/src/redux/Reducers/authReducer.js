import { SET_CURRENT_USER } from "../actionTypes";
const initState = {
    user: null
};

export default function (state = initState, action) {

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}