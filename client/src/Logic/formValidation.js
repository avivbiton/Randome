import Schema from "validate";

// NOTE: email and password is already handled by firebase
const registerSchema = new Schema({

    displayName: {
        type: String,
        required: true,
        length: { min: 3, max: 12 },
        message: {
            type: "Invalid display name.",
            required: "Display name is required.",
            length: "Length must be between 3 and 12"
        }
    }
});



export const validateRegisterForm = (dataObject) => {
    const errors = registerSchema.validate(dataObject);
    return transformErrors(errors);
};






function transformErrors(errors) {
    const newErrors = [];
    for (let i = 0; i < errors.length; i++) {
        newErrors.push({ name: errors[i].path, message: errors[i].message });
    }

    return newErrors;
}