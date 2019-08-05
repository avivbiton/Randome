const validateSchema = (schema, dataObject) => {
	return transformErrors(schema.validate(dataObject));
};

function transformErrors(errors) {
	const newErrors = {};
	for (let i = 0; i < errors.length; i++) {
		newErrors[errors[i].path] = errors[i].message;
	}

	return newErrors;
}

module.exports = validateSchema;