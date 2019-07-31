require("dotenv").config();
const express = require("express");

const database = require("./database");
const firebase = require("./firebase");
const LoadRoutes = require("./routes/index");
const production = require("./production");
const app = express();

firebase.initialize();
database.initializeConnection();

if (process.env.NODE_ENV === "production")
	production.initializeProductionBuild();

LoadRoutes(app);

module.exports = app;

