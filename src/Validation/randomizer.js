const Schema = require("validate");

const validationSchema = new Schema({
    name: {
        type: String,
        required: true,
        length: {
            min: 2,
            max: 30
        }
    },
    description: {
        type: String,
        required: true,
        length: {
            min: 1,
            max: 5000
        }
    },
    schema: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    }
});

module.exports = validationSchema;