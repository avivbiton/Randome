const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const randomizerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    jsonSchema: {
        type: String,
        required: true
    },
    owner: {
        name: String,
        id: String
    },
    private: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    meta: {
        likes: {
            type: Number,
            default: 0
        },
        favorites: {
            type: Number,
            default: 0
        }
    }
});


const Randomizer = mongoose.model("Randomizer", randomizerSchema);

module.exports = Randomizer;
