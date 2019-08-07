const HttpError = require("./HttpError");

class ValidationError extends HttpError {
    constructor() {
        super("Invalid data", 400);
    }
}

module.exports = ValidationError;