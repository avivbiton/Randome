const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");


const createNew = [
	requireBody(["name", "description", "schema"]),
	async (req, res, next) => {
		const data = {
			name: req.body.name,
			description: req.body.description,
			schema: req.body.schema
		};

		try {
			await randomizerService.createNew(data.name, data.description, data.schema);
			return res.json({ success: "Randomizer created successfully" });
		} catch (error) {
			next(error);
		}

	}];

module.exports = createNew;