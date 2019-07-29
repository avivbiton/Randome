const firebase = require("firebase-admin");
const authenticateUser = require("../../middleware/authenticateUser");

const current = [authenticateUser, async (req, res, next) => {
	res.json(req.user);
}];

module.exports = current;