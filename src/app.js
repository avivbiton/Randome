require("dotenv").config();
const express = require("express");
const database = require("./database");
const firebase = require("./firebase");
const LoadRoutes = require("./routes/index");
const production = require("./production");
const middleware = require("./middleware/startup");
const logger = require("./services/logger");
const app = express();
app.use(require("cors")());

process.on("uncaughtException", error => {
    logger.error(`Uncaught Exception: ${error}`);
});

app.use((req, res, next) => {
    console.log(`request to: ${req.originalUrl}`);
    next();
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

app.listen(process.env.PORT, () => {
    logger.info(`Server started on port ${process.env.PORT}`);
});

module.exports = app;

