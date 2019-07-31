const authIndex = require("./auth/authIndex");
const notFoundHandler = require("./notFoundRoute");
const errorHandler = require("./errorHandler");

function LoadRoutes(app) {
	app.use("/auth", authIndex);

	app.use(notFoundHandler);
	app.use(errorHandler);

}

module.exports = LoadRoutes;