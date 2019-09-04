const AsyncLock = require("async-lock");
const lock = new AsyncLock();

const lockEndpoint = key => function (req, res, next) {
    lock.acquire(key, function (done) {
        req.done = done;
        next();
    }).catch(error => next(error));
};

module.exports = lockEndpoint;