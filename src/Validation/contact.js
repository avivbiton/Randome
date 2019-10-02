const Schema = require("validate");

const contactValidation = new Schema({
    title: {
        type: String,
        required: true,
        length: {
            max: 100
        },
        message: {
            required: "Title is required",
            length: "Title is too long"
        }     
    },
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true,
        length: {
            max: 10000
        },
        message: {
            required: "Please write something first",
            length: "Too Long!"
        }
    }
});

module.exports = contactValidation;