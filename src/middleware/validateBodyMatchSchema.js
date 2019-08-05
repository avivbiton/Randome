const validateSchema = require("../services/validationService");

const validateBodyMatchSchema = schema => (req, res, next) => {

	const bodyKeys = Object.keys(schema.props);
	const dataObject = {};
	bodyKeys.forEach(k => {
		dataObject[k] = req.body[k];
	});

	const errors = validateSchema(schema,dataObject);
	if(Object.keys(errors).length !== 0) {
		return res.status(400).json(errors);
	}
	return next();

};

module.exports = validateBodyMatchSchema;