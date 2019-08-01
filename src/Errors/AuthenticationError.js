const HttpError = require("./HttpError");

class AuthenticationError extends HttpError {

	constructor() {
		super("Authentication Failed", 401);
	}
}

module.exports = AuthenticationError;