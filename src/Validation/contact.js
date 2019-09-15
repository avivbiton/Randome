const Schema = require("validate");

const contactValidation = new Schema({
    title: {
        type: String,
        required: true,
        length: {
            min: 1,
            max: 100
        }     
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        length: {
            max: 10000
        },
        message: {
            length: "Too Long!"
        }
    }
});

module.exports = contactValidation;