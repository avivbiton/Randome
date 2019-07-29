import { PUSH_ERROR, CLEAR_ERRORS, PUSH_ERROR_ARRAY, REMOVE_ERROR } from "../actionTypes";

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

/**
 * 
 * @param errors an array of errors to push
 */
export const pushManyErrors = (errors) => {
    return {
        type: PUSH_ERROR_ARRAY,
        payload: errors
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const removeError = errorName => {
    return {
        type: REMOVE_ERROR,
        payload: errorName
    };
};