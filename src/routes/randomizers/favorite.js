const authenticateUser = require("../../middleware/authenticateUser");
const requireBody = require("../../middleware/requireBody");
const service = require("../../services/randomizerService");

const favoriteRandomizer = [
    authenticateUser,
    requireBody(["id"]),
    async (req, res, next) => {
        try {
            const increase = await service.favoriteRandomizer(req.body.id, req.account);
            return res.status(200).json({ increase: increase });
        } catch (error) {
            next(error);
        }
    }
];

module.exports = favoriteRandomizer;