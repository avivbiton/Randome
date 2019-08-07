export const validateSchema = (schema, dataObject) => {
    let errors = schema.validate(dataObject);
    return transformErrors(errors);
};


/**
 * Transform errors sent by validate package
 */
function transformErrors(errors) {
    const newErrors = {};
    for (let i = 0; i < errors.length; i++) {
        newErrors[errors[i].path] = errors[i].message;
    }

    newErrors.length = errors.length;
    return newErrors;
}