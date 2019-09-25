const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
    points: 15,
    duration: 86400,
});

module.exports = rateLimiter;
