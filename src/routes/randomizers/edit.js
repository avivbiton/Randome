const authenticateUser = require("../../middleware/authenticateUser");
const authorizeRandomizerUsage = require("../../middleware/authorizeRandomizerUsage");
const requireBody = require("../../middleware/requireBody");
const validateBodyMatchSchema = require("../../middleware/validateBodyMatchSchema");
const validationSchema = require("../../Validation/randomizer");
const ContentGenerator = require("randomcontentgenerator").ContentGenerator;
const randomizerService = require("../../services/randomizerService");

const editRandomizer = [
    authenticateUser(),
    authorizeRandomizerUsage,
    requireBody(["name", "description", "private", "schema"]),
    validateBodyMatchSchema(validationSchema),
    async (req, res, next) => {


        try {
            const isValid = new ContentGenerator(JSON.parse(req.body.schema)).isValid();
            if (isValid !== true) {
                throw isValid;
            }

            const passRequirement = randomizerService.schemaMatchRequirements(JSON.parse(req.body.schema));
            if (passRequirement !== true) {
                return res.status(400).json({ schema: `Schema Error: \n${passRequirement}` });
            }
        }
        catch (error) {
            return res.status(400).json({ schema: `Schema Error: \n${error}` });
        }

        try {
            const randomizer = req.randomizer;
            randomizer.name = req.body.name;
            randomizer.description = req.body.description;
            randomizer.private = req.body.private;
            randomizer.jsonSchema = req.body.schema;
            await randomizer.save();
            return res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
];

module.exports = editRandomizer;