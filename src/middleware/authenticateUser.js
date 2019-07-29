const admin = require("firebase-admin");

module.exports = async (req, res, next) => {

	const authToken = req.get("Authorization");

	try {
		const decoded = await admin.auth().verifyIdToken(authToken);
		req.user = decoded;
		next();
	} catch (error) {
		res.json(error);
	}
};