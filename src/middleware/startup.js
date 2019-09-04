const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const basicLimiter = require("../rateLimiters/basicLimiter");
const blockLimiter = require("../rateLimiters/basicLimiter");

const useMiddleware = (app) => {
    app.use(helmet());
    
    app.use(blockLimiter);
    app.use(basicLimiter);

    app.use(logger("dev"));
    app.use(express.json({ limit: "500kb" }));
    app.use(express.urlencoded({ extended: false, limit: "500kb" }));
};

module.exports = { useMiddleware };