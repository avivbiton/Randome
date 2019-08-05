const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");
const authenticateUser = require("../../middleware/authenticateUser");

const createNew = [
	requireBody(["name", "description", "schema"]),
	authenticateUser,
	async (req, res, next) => {

		//TODO: do some checks here
		const data = {
			name: req.body.name,
			description: req.body.description,
			schema: req.body.schema
		};

		

		try {
			//TODO: test this
			await randomizerService.createNew(req.user.uid, data.name, data.description, data.schema);
			return res.status(201).send("Created.");
		} catch (error) {
			next(error);
		}

	}];

module.exports = createNew;