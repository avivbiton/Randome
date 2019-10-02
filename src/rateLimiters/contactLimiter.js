const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 86400,
});

const rateLimiterMiddleware = (req, res, next) => {

    const consumeMethod = req.account ? req.account.userId : req.ip;

    rateLimiter.consume(consumeMethod, 1)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send("Blocked - Too Many Requests");
        });
};

module.exports = rateLimiterMiddleware;
