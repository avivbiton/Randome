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
    },
    schema: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    }
});

const createNew = [
    requireBody(["name", "description", "schema", "private"]),
    validateBodyMatchSchema(validationSchema),
    authenticateUser,
    async (req, res, next) => {

        const { name, description, schema, private } = req.body;

        //TODO: verify the schema here

        try {
            await randomizerService.createNew(req.user.uid, name, description, schema, private);
            return res.status(201).send("Created.");
        } catch (error) {
            next(error);
        }

    }];

module.exports = createNew;