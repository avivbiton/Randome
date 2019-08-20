const randomizerService = require("../../services/randomizerService");

const fetch = async (req, res, next) => {

    const search = req.query.search || "";
    const page = req.query.page || 0;
    const sortBy = req.query.sortBy || "createdAt";
    try {

        const filter = search === "" ? { private: false }
            : {
                name: { $regex: `.*${search}.*`, $options: "i" },
                private: false
            };

        const data = await randomizerService.fetch(filter, page, sortBy);
        res.json(data);
    } catch (error) {
        next(error);
    }

};


module.exports = fetch;



