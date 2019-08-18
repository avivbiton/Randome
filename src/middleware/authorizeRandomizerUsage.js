const Randomizer = require("../Models/Randomizer");
const MissingDependencyError = require("../Errors/MissingDependencyError");

const authorizeRandomizerUsage = async (req, res, next) => {
    try {
        if (!req.params.id) {
            throw new MissingDependencyError("params.id");
        }

        if(!req.user) {
            throw new MissingDependencyError("authenticateUser");
        }

        const randomizer = await Randomizer.findById(req.params.id);

        if(randomizer === null) {
            return res.status(404).send();
        }

        if(randomizer.owner.id !== req.user.uid) {
            return res.status(401).send("Unauthorized");
        }

        req.randomizer = randomizer;
        next();

    } catch (error) {
        next(error);
    }

};

module.exports = authorizeRandomizerUsage;