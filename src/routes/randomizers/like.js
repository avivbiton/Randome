const authenticateUser = require("../../middleware/authenticateUser");
const requireBody = require("../../middleware/requireBody");
const service = require("../../services/randomizerService");


const lockEndpoint = require("../../middleware/lockEndpoint");
const unlockOnError = require("../../middleware/unlockOnError");

const likeRandomizer = [
    requireBody(["id"]),
    lockEndpoint("like"),
    authenticateUser(),
    unlockOnError,
    async (req, res, next) => {
        try {
            const increase = await service.likeRandomizer(req.body.id, req.account);
            res.status(200).json({ increase: increase });
        } catch (error) {
            next(error);
        }
        req.done();
    }
];

module.exports = likeRandomizer;