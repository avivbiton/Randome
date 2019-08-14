class RequestError {

    constructor(error, message = "There was an error, please try again later.") {
        this.data = error;
        this.message = message;
    }
}

export default RequestError;
