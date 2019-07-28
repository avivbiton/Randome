const firebase = require("firebase-admin");
const authenticateUser = require("../../middleware/authenticateUser");

const login = [authenticateUser, async (req, res, next) => {

	res.json(req.user);

}];

module.exports = login;