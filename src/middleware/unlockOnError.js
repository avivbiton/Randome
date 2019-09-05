const unlockOnError = (error, req, res, next) => {
    if (req.done) {
        req.done();
    }
    next(error);
};

module.exports = unlockOnError;