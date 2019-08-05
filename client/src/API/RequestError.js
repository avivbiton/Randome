class RequestError {

    constructor(error, message = "There was an error, please try again later.") {
        this.error = error;
        this.message = message;
    }
}

export default RequestError;
