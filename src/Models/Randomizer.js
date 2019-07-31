const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const randomizerSchema = new Schema({
	name: String,
	description: String,
	jsonSchema: String,
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
		likes: Number,
		favorites: Number
	}
});


const Randomizer = mongoose.model("Randomizer", randomizerSchema);

module.exports = Randomizer;
