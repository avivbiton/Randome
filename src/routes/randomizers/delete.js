const authenticateUser = require("../../middleware/authenticateUser");
const authorizeRandomizerUsage  = require("../../middleware/authorizeRandomizerUsage");
const Randomizer = require("../../Models/Randomizer");

const deleteRandomizer = [
    authenticateUser(),
    authorizeRandomizerUsage,
    async (req, res, next) => {
        try {
            await Randomizer.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
];

module.exports = deleteRandomizer;