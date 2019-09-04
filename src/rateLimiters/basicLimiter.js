const RateLimiterMemory = require("rate-limiter-flexible").RateLimiterMemory;

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 1
});

const applyLimiter = (req, res, next) => {
    rateLimiter.consume(req.ip).then(() => next())
        .catch(() => res.status(429).send("Rquest limit reached."));
};

module.exports = applyLimiter;