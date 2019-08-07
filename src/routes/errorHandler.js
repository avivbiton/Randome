const HttpError = require("../Errors/HttpError");

function errorHandler(err, req, res, next) {
    //TODO: Remove this later, when we add proper logging
    console.log(err);

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