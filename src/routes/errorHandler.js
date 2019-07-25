function errorHandler (err, req, res, next) {
	//TODO: Remove this later
	console.log(err);

	const errorMessage = process.env.NODE_ENV !== "development" ? "Internal Server Error" :
		`${err.message}\nStack: ${err.stack}`;
	res.status(err.status || 500);
	res.send(errorMessage);
}

module.exports = errorHandler;