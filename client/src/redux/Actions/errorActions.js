import { PUSH_ERROR, CLEAR_ERRORS } from "../actionTypes";

/**
 * 
 * @param {name} name the name of the error
 * @param {message} message the message of the error
 */
export const pushError = ({ name, message }) => {
    return {
        type: PUSH_ERROR,
        payload: { name, message }
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};