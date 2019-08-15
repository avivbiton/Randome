const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");
const authenticateUser = require("../../middleware/authenticateUser");
const ValidationError = require("../../Errors/ValidationError");
const ContentGenerator = require("randomcontentgenerator").ContentGenerator;

const validateBodyMatchSchema = require("../../middleware/validateBodyMatchSchema");

const validationSchema = require("../../Validation/randomizer");

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