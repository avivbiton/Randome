const Randomizer = require("../Models/Randomizer");
const errorHandler = require("./errorHandler");
const MongooseError = require("mongoose").Error;
const ValidationError = require("../Errors/ValidationError");
const admin = require("firebase-admin");

const maxPerFetch = 100;

const fetch = async (page, sortBy = "createdAt") => {
	const skip = maxPerFetch * page;

	try {
		const docs = await Randomizer.find({ private: false }, "name description meta _id owner.name").skip(skip).limit(maxPerFetch)
			.sort({ [sortBy]: "desc" }).lean().exec();
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

const createNew = async (ownerId, name, description, schema, private) => {
	try {
		const userData = await admin.auth().getUser(ownerId);
		const newRandomizer = new Randomizer({
			name,
			owner: {
				id: ownerId,
				name: userData.displayName
			},
			description,
			jsonSchema: schema,
			meta: {
				likes: 0,
				favorites: 0
			},
			private
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
	fetch,
	createNew,
	findById
};