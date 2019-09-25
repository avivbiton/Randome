const randomizerService = require("../../services/randomizerService");
const requireBody = require("../../middleware/requireBody");
const authenticateUser = require("../../middleware/authenticateUser");
const ValidationError = require("../../Errors/ValidationError");
const ContentGenerator = require("randomcontentgenerator").ContentGenerator;
const randomizerLimiter = require("../../rateLimiters/randomizerLimiter");
const validateBodyMatchSchema = require("../../middleware/validateBodyMatchSchema");

const validationSchema = require("../../Validation/randomizer");

const createNew = [
    requireBody(["name", "description", "schema", "private"]),
    validateBodyMatchSchema(validationSchema),
    authenticateUser(),
    async (req, res, next) => {

        const { name, description, schema, private } = req.body;

        try {
            const parsedSchema = JSON.parse(schema);
            const isValid = new ContentGenerator(parsedSchema).isValid();
            if (isValid !== true) {
                throw isValid;
            }

            if (parsedSchema.fields.length === 0) {
                return res.status(400).json({ schema: "Must have at least one field." });
            }
            const passRequirement = randomizerService.schemaMatchRequirements(parsedSchema);
            if (passRequirement !== true) {
                return res.status(400).json({ schema: `Schema Error: \n${passRequirement}` });
            }
        }
        catch (error) {
            return res.status(400).json({ schema: `Schema Error: \n${error}` });
        }

        try {
            const limiterRes = await randomizerLimiter.get(req.user.uid);
            if (limiterRes !== null && limiterRes.remainingPoints <= 0) {
                return res.status(429).send("Too many requests");
            }
            await randomizerService.createNew(req.user.uid, name, description, schema, private);
            await randomizerLimiter.consume(req.user.uid, 1);
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