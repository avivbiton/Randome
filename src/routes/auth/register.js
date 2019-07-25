const firebase = require("firebase");

async function registerUser(req, res, next) {
	return res.status(200).json({ success: true });
}

module.exports = registerUser;


