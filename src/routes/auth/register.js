const firebase = require("firebase");

async function registerUser(req, res, next) {

	const newUser = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		const user = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
		return res.json(user);
	}
	catch (error) {
		console.log(error);
		return res.status(500).json({ errorCode: error.code, message: error.message });
	}

}

module.exports = registerUser;


