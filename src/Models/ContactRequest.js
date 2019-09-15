const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactRequestSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false
    },
    message: {
        type: String,
        required: true,
        maxlength: 10000
    }
}, { timestamps: true });


const ContactRequest = mongoose.model("ContactRequest", contactRequestSchema);

module.exports = ContactRequest;