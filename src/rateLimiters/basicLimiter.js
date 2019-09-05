const RateLimiterMemory = require("rate-limiter-flexible").RateLimiterMemory;

const rateLimiter = new RateLimiterMemory({
    points: 8,
    duration: 1
});

const applyLimiter = (req, res, next) => {
    rateLimiter.consume(req.ip, 1).then(() => next())
        .catch(() => res.status(429).send("Rquest limit reached."));
};

module.exports = applyLimiter;