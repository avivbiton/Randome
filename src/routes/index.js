const randomizerIndex = require("./randomizers/randomizerIndex");
const accountIndex = require("./account/accountIndex");
const errorHandler = require("./errorHandler");

function LoadRoutes(app) {
    app.use("/randomizer", randomizerIndex);
    app.use("/account", accountIndex);

    app.use(errorHandler);
}

module.exports = LoadRoutes;