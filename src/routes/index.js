const authIndex = require("./auth/authIndex");

function LoadRoutes(app) {
	app.use("/auth", authIndex);
}

module.exports = LoadRoutes;