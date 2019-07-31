const randomizerService = require("../../services/randomizerService");

const createNew = async (req, res, next) => {

	const data = {
		name: req.body.name,
		description: req.body.description,
		schema: req.body.schema
	};


	try {
		const success = await randomizerService.createNew(data.name, data.description, data.schema);
		if (success) {
			res.json({ success: "Randomizer created successfully" });
		} else {
			res.json({ error: "Failed to create randomizer" });
		}
	} catch (error) {
		next(error);
	}

};

module.exports = createNew;