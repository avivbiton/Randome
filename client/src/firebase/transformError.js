const errorMap = {
    "auth/weak-password": "password",
    "auth/email-already-in-use": "email",
    "auth/invalid-email": "email",
    "auth/wrong-password": "password",
    "auth/user-disabled": "email",
    "auth/user-not-found": "email",
    "auth/operation-not-allowed": "email",
    "auth/network-request-failed": "form",
    "auth/user-mismatch": "user",
    "auth/invalid-credential": "form",
};

const customMessages = {
    "auth/wrong-password": "Wrong password"
}

/**
 * 
 * Transform errors sent by firebase API to the standard format of errors handled by the application
 */
export default function transformError({ code, message }, customError = null) {

    const newMessage = customMessages[code] ? customMessages[code] : message;

    if(customError !== null && customError[code]){
        return {
            [customError[code]]: newMessage
        }
    }
    if (errorMap[code]) {
        return {
            [errorMap[code]]: newMessage
        };
    } else {
        return {
            form: "An error has occured, please try again later."
        };
    }
}