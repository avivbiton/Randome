/* eslint-disable indent */

const authenticateUser = require("../../middleware/authenticateUser");
const randomizerService = require("../../services/randomizerService");

const fetchMeta = [
    authenticateUser(),
    async (req, res, next) => {
        const type = req.query.type || "favorites";
        let array = null;
        switch (type) {
            case "favorites":
                array = req.account.meta.favorites;
                break;
            case "likes":
                array = req.account.meta.likes;
                break;
            default:
                array = null;
        }

        if (array === null) {
            return res.status(400).json({ error: "Invalid type in query" });
        }

        try {
            const docs = await randomizerService.fetchManyById(array);
            return res.json(docs);
        } catch (error) {
            next(error);
        }
    }
];

module.exports = fetchMeta;