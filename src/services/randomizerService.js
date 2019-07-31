const Randomizer = require("../Models/Randomizer");
const handleError = require("./errorHandler").handleError;
const maxPerFetch = 10;

const CastError = require("mongoose").Error.CastError;


const fetchLatest = async (page) => {
	const skip = maxPerFetch * page;
	try {
		const docs = await Randomizer.find().skip(skip).limit(maxPerFetch).sort({ createdAt: "desc" }).lean().exec();
		return docs;
	}
	catch (error) {
		return handleError(error);
	}
};


const findById = async (id) => {
	try {
		const found = await Randomizer.findById(id).lean().exec();
		return found;

	} catch (error) {
		if(error instanceof CastError) {
			return null;
		}
		return handleError(error);
	}
};

const createNew = async (name, description, schema) => {
	try {
		const newRandomizer = new Randomizer({
			name,
			description,
			jsonSchema: schema,
			meta: {
				likes: 0,
				favorites: 0
			}
		});

		await newRandomizer.save();
		return true;
	} catch (error) {
		return handleError(error);
	}
};



module.exports = {
	fetchLatest,
	createNew,
	findById
};