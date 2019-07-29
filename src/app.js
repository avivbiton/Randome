const express = require("express");
const path = require("path");
const logger = require("morgan");
const LoadRoutes = require("./routes/index");
const notFoundHandler = require("./routes/notFoundRoute");
const errorHandler = require("./routes/errorHandler");

const admin = require("firebase-admin");

const app = express();

const serviceAccount = require("../firebase-admin.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DB
});


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "production")
	serveProductionBuild();


LoadRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

function serveProductionBuild() {
	app.use(express.static(path.join(__dirname + "/..", "client", "build")));
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}


module.exports = app;

