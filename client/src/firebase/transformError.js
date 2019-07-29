const errorMap = {
    "auth/weak-password": "password",
    "auth/email-already-in-use": "email",
    "auth/invalid-email": "email",
    "auth/wrong-password": "password",
    "auth/user-disabled": "email",
    "auth/user-not-found": "email",
    "auth/operation-not-allowed": "email"
};

/**
 * 
 * Transform errors sent by firebase API to the standard format of errors handled by the application
 */
export default function transformError({ code, message }) {
    if (errorMap[code]) {
        return {
            name: errorMap[code],
            message
        };
    } else {
        return {
            name: "UNKOWN",
            message
        };
    }
}