const randomizerIndex = require("./randomizers/randomizerIndex");
const accountIndex = require("./account/accountIndex");
const errorHandler = require("./errorHandler");

function LoadRoutes(app) {
    app.use("/api/randomizer", randomizerIndex);
    app.use("/api/account", accountIndex);

    app.use(errorHandler);
}

module.exports = LoadRoutes;