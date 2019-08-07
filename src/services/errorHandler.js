const HttpError = require("../Errors/HttpError");


const throwError = (error) => {
    // TODO: Add error loggin here
    throw error;
};

const handleUnkownError = (error) => {
    // TOOD: add error loggin here ?
    throw new HttpError(error, 500);
};

module.exports = {
    handleUnkownError,
    throwError
};