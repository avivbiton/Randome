const randomizerService = require("../../services/randomizerService");

const fetchById = async (req, res, next) => {
    try {
        const data = await randomizerService.findById(req.params.id);
        if (data === null) {
            res.status(404).json({ NotFound: "The data could not be found" });
            return;
        }
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};

module.exports = fetchById;