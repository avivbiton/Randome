const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const useMiddleware = (app) => {
    app.use(helmet());
    app.use(logger("dev"));
    app.use(express.json({ limit: "500kb" }));
    app.use(express.urlencoded({ extended: false, limit: "500kb" }));
};

module.exports = { useMiddleware };