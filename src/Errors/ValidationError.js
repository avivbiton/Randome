const HttpError = require("./HttpError");

class ValidationError extends HttpError {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 400;
    }
}

module.exports = ValidationError;