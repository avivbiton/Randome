const randomizerIndex = require("./randomizers/randomizerIndex");
const accountIndex = require("./account/accountIndex");
const contactIndex = require("./contact/index");
const errorHandler = require("./errorHandler");

function LoadRoutes(app) {
    app.use("/api/randomizer", randomizerIndex);
    app.use("/api/account", accountIndex);
    app.use("/api/contact", contactIndex);

    app.use(errorHandler);
}

module.exports = LoadRoutes;