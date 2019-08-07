const randomizerIndex = require("./randomizers/randomizerIndex");
const accountIndex = require("./account/accountIndex");
const notFoundHandler = require("./notFoundRoute");
const errorHandler = require("./errorHandler");

function LoadRoutes(app) {
    app.use("/randomizer", randomizerIndex);
    app.use("/account", accountIndex);

    app.use(notFoundHandler);
    app.use(errorHandler);

}

module.exports = LoadRoutes;