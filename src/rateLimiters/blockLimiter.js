const { RateLimiterMemory } = require("rate-limiter-flexible");

// against DDOS attacks

const rateLimiter = new RateLimiterMemory({
    points: 500,
    duration: 60,
    blockDuration: 120,
    inmemoryBlockOnConsumed: 301,
    inmemoryBlockDuration: 120,
});

const rateLimiterMiddleware = (req, res, next) => {

    rateLimiter.consume(req.ip, 1)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send("Blocked - Too Many Requests");
        });
};

module.exports = rateLimiterMiddleware;
