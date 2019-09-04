require("dotenv").config();
const express = require("express");

const database = require("./database");
const firebase = require("./firebase");
const LoadRoutes = require("./routes/index");
const production = require("./production");
const middleware = require("./middleware/startup");
const logger = require("./services/logger");
const app = express();

process.on("uncaughtException", error => {
    logger.error(`Uncaught Exception: ${error}`);
});

firebase.initialize();
database.initializeConnection();


app.use((req, res, next) => {
    req.setTimeout(25000);
    next();
});

middleware.useMiddleware(app);

if (process.env.NODE_ENV === "production")
    production.initializeProductionBuild(app);

LoadRoutes(app);


module.exports = app;

