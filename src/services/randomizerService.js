const Randomizer = require("../Models/Randomizer");
const errorHandler = require("./errorHandler");
const maxPerFetch = 10;
const MongooseError = require("mongoose").Error;
const ValidationError = require("../Errors/ValidationError");


const fetchLatest = async (page) => {
	const skip = maxPerFetch * page;
	try {
		const docs = await Randomizer.find().skip(skip).limit(maxPerFetch).sort({ createdAt: "desc" }).lean().exec();
		return docs;
	}
	catch (error) {
		return errorHandler.handleUnkownError(error);
	}
};


const findById = async (id) => {
	try {
		const found = await Randomizer.findById(id).lean().exec();
		return found;

	} catch (error) {
		if (error instanceof MongooseError.CastError) {
			return null;
		}

		return errorHandler.handleUnkownError(error);
	}
};

const createNew = async (ownerId, name, description, schema) => {
	try {
		const newRandomizer = new Randomizer({
			name,
			owner: ownerId,
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
		if (error instanceof MongooseError.ValidationError) {
			throw new ValidationError("Data sent is invalid or missing", 400);
		}

		return errorHandler.handleUnkownError(error);
	}
};



module.exports = {
	fetchLatest,
	createNew,
	findById
};