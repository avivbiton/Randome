const randomizerService = require("../../services/randomizerService");

const fetch = async (req, res, next) => {

    const page = req.query.page || 0;
    const sortBy = req.query.sortBy || "createdAt";

    try {
        const docs = await randomizerService.fetch(page, sortBy);
        res.json(docs);
    } catch (error) {
        next(error);
    }

};

module.exports = fetch;



