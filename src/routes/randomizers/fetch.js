const randomizerService = require("../../services/randomizerService");

const fetch = async (req, res, next) => {

	const page = req.body.page || 0;
	const sortBy = req.body.sortBy || "createdAt";

	try {
		const docs = await randomizerService.fetch(page, sortBy);
		res.json(docs);
	} catch (error) {
		next(error);
	}

};

module.exports = fetch;



