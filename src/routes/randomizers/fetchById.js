const randomizerService = require("../../services/randomizerService");

const fetchById = async (req, res, next) => {
	console.log(req.params.id);
	try {
		const data = await randomizerService.findById(req.params.id);
		if (data === null) {
			res.status(400).json({ NotFound: "The data could not be found" });
			return;
		}
		res.json(data);

	} catch (error) {
		next(error);
	}
};

module.exports = fetchById;