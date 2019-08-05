const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const randomizerSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 200
	},
	jsonSchema: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
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
