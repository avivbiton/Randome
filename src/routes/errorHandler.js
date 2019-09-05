const HttpError = require("../Errors/HttpError");
const logger = require("../services/logger");

function errorHandler(err, req, res, next) {
    logger.error(`Request error: \n 
    request info: ${req}\n
    error info: ${err}`);

    const developmentMode = process.env.NODE_ENV === "development";

    if ((err instanceof HttpError) === false) {
        err.statusCode = 500;
    }

    let errorMessage = err.statusCode == 500 && developmentMode == false ? "Internal Server Error" :
        `${err.message}\n`;

    if (developmentMode) {
        errorMessage += err.stack;
    }
    res.status(err.statusCode).send(errorMessage);
}

module.exports = errorHandler;