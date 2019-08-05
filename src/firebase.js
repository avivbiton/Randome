const admin = require("firebase-admin");
const serviceAccount = require("../firebase-admin.json");

const initialize = () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: process.env.FIREBASE_DB
	});

};

module.exports = { initialize };
