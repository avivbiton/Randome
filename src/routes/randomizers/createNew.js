const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");
const authenticateUser = require("../../middleware/authenticateUser");
const Schema = require("validate");

const validateBodyMatchSchema = require("../../middleware/validateBodyMatchSchema");

const validationSchema = new Schema({
	name: {
		type: String,
		required: true,
		length: {
			min: 2,
			max: 25
		}
	},
	description: {
		type: String,
		required: true,
		length: {
			min: 1,
			max: 250
		}
	}
});

const createNew = [
	requireBody(["name", "description", "schema", "private"]),
	validateBodyMatchSchema(validationSchema),
	authenticateUser,
	async (req, res, next) => {
		const data = {
			name: req.body.name,
			description: req.body.description,
			schema: req.body.schema,
			private: req.body.private
		};


		//TODO: verify the schema here

		try {
			await randomizerService.createNew(req.user.uid, data.name, data.description, data.schema, data.private);
			return res.status(201).send("Created.");
		} catch (error) {
			next(error);
		}

	}];

module.exports = createNew;