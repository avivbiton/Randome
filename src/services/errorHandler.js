
const handleError = (error) => {
	// TOOD: add error loggin here ?
	throw new Error(error);
};

module.exports = {
	handleError
};