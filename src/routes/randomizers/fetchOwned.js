const authenticateUser = require("../../middleware/authenticateUser");
const randomizerService = require("../../services/randomizerService");
const fetchOwned = [
    authenticateUser(),
    async (req, res, next) => {
        try {
            const docs = await randomizerService.fetchByOwnerId(req.user.uid);

            return res.json(docs);
        }
        catch (error) {
            next(error);
        }
    }
];

module.exports = fetchOwned;