import { PUSH_ERROR, CLEAR_ERRORS, PUSH_ERROR_ARRAY, REMOVE_ERROR } from "../actionTypes";

const initState = {};



export default function (state = initState, action) {

    switch (action.type) {
        case PUSH_ERROR:
            return {
                ...state,
                [action.payload.name]: action.payload.message
            };
        case PUSH_ERROR_ARRAY: {
            let object = {};
            for (let i = 0; i < action.payload.length; i++) {
                object[action.payload[i].name] = action.payload[i].message;
            }
            return {
                ...state,
                ...object
            };
        }
        case CLEAR_ERRORS:
            return {};
        case REMOVE_ERROR: {
            delete state[action.payload];
            return {
                ...state
            };
        }
        default:
            return state;
    }
}