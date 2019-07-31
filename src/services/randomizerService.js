const Randomizer = require("../Models/Randomizer");
const handleError = require("./errorHandler").handleError;
const maxPerFetch = 10;


const fetchLatest = async (page) => {
	const skip = maxPerFetch * page;
	try {
		const docs = await Randomizer.find().skip(skip).limit(maxPerFetch).sort({ createdAt: "desc" }).lean().exec();
		return docs;
	}
	catch (error) {
		handleError(error);
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
		handleError(error);
		return false;
	}
};



module.exports = {
	fetchLatest,
	createNew
};