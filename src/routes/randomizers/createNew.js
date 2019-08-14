const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");
const authenticateUser = require("../../middleware/authenticateUser");
const Schema = require("validate");
const ValidationError = require("../../Errors/ValidationError");
const ContentGenerator = require("randomcontentgenerator").ContentGenerator;

const validateBodyMatchSchema = require("../../middleware/validateBodyMatchSchema");

const validationSchema = new Schema({
    name: {
        type: String,
        required: true,
        length: {
            min: 2,
            max: 30
        }
    },
    description: {
        type: String,
        required: true,
        length: {
            min: 1,
            max: 500
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

        if (new ContentGenerator(schema).isValid() !== true) {
            return res.status(400).json({ schema: "Invalid schema" });
        }
        
        try {
            await randomizerService.createNew(req.user.uid, name, description, schema, private);
            return res.status(201).send("Created.");
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(error.statusCode).json(error.message);
            } else {
                next(error);
            }
        }

    }];

module.exports = createNew;