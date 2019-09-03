const randomizerService = require("../../services/randomizerService");
const authenticateUser = require("../../middleware/authenticateUser");

const fetchById = [
    authenticateUser(false),
    async (req, res, next) => {
        try {
            const data = await randomizerService.findById(req.params.id);
            if (data === null) {
                res.status(404).json({ NotFound: "The data could not be found" });
                return;
            }
            if (data.private) {
                if (!req.user || data.owner.id != req.user.uid) {
                    return res.status(401).json({ private: "This randomizer is private. only the owner can view it." });
                }
            }
            return res.status(200).json(data);


        } catch (error) {
            next(error);
        }
    }];

module.exports = fetchById;