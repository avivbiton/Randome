const requireBody = require("../../middleware/requireBody");
const validateBody = require("../../middleware/validateBodyMatchSchema");
const authenticateUser = require("../../middleware/authenticateUser");
const ContactRequest = require("../../Models/ContactRequest");

const validationSchema = require("../../Validation/contact");

module.exports = [
    requireBody(["title", "email", "message"]),
    validateBody(validationSchema),
    authenticateUser(false),
    async (req, res, next) => {
        try {
            const { title, email, message } = req.body;
            await ContactRequest.create({
                title,
                email,
                message,
                user: req.user ? { displayName: req.user.displayName } : null
            });

            return res.status(203).json({ success: "Request sent." });
        } catch (error) {
            next(error);
        }
    }
]