const randomizerService = require("../../services/randomizerService");

const fetch = async (req, res, next) => {

    const search = req.query.search || "";
    const page = req.query.page || 0;
    const sortBy = req.query.sortBy || "createdAt";
    try {

        const filter = search === "" ? { private: false } : { $text: { $search: search }, private: false };

        const docs = await randomizerService.fetch(filter, page, sortBy);
        res.json(docs);
    } catch (error) {
        next(error);
    }

};


module.exports = fetch;



