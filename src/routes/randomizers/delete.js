const authenticateUser = require("../../middleware/authenticateUser");
const Randomizer = require("../../Models/Randomizer");

const deleteRandomizer = [
    authenticateUser,
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