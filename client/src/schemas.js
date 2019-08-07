
import Schema from "validate";

// NOTE: email and password is already handled by firebase
export const registerSchema = new Schema({

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
