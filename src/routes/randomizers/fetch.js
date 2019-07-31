const randomizerService = require("../../services/randomizerService");

const fetch = async (req, res, next) => {

	const page = req.body.page || 0;

	try {
		const docs = await randomizerService.fetchLatest(page);
		res.json(docs);
	} catch (error) {
		next(error);
	}

};

module.exports = fetch;



