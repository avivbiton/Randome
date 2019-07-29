import { PUSH_ERROR, CLEAR_ERRORS } from "../actionTypes";

const initState = {};



export default function (state = initState, action) {

    switch (action.type) {
        case PUSH_ERROR:
            return {
                ...state,
                [action.payload.name]: action.payload.message
            };
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}