const admin = require("firebase-admin");
const AuthenticationError = require("../Errors/AuthenticationError");

module.exports = async (req, res, next) => {

	const authToken = req.get("Authorization");

	try {
		const decoded = await admin.auth().verifyIdToken(authToken);
		console.log(req.user);
		req.user = decoded;
		next();
	} catch (error) {
		next(new AuthenticationError());
	}
};