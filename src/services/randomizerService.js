const Randomizer = require("../Models/Randomizer");
const Account = require("../Models/Account");
const errorHandler = require("./errorHandler");
const MongooseError = require("mongoose").Error;
const ValidationError = require("../Errors/ValidationError");
const admin = require("firebase-admin");

const maxPerFetch = 18;

const fetch = async (search = {}, page = 1, sortBy = "createdAt") => {
    page = Math.max(1, page);
    const skip = maxPerFetch * (page - 1);
    try {
        const docs = await Randomizer.find(search, "name description meta _id owner.name").skip(skip).limit(maxPerFetch)
            .sort({ [sortBy]: "desc" });
        const totalPages = Math.ceil(await Randomizer.count().exec() / maxPerFetch);
        return { totalPages, docs };
    }
    catch (error) {
        return errorHandler.throwError(error);
    }
};


const fetchByOwnerId = async (uid) => {

    try {
        const docs = await Randomizer.find({ "owner.id": uid }, "name description meta _id private createdAt updatedAt").lean().exec();
        return docs;
    } catch (error) {
        return errorHandler.throwError(error);
    }
};

const fetchManyById = async (arrayId) => {

    try {
        return await Randomizer.find({ "_id": { $in: arrayId } },
            "name owner.name private meta description createdAt updatedAt _id").lean().exec();

    } catch (error) {
        errorHandler.throwError(error);
    }

};

const findById = async (id, projection = null) => {
    try {
        const found = await Randomizer.findById(id, projection).lean().exec();
        return found;

    } catch (error) {
        if (error instanceof MongooseError.CastError) {
            return null;
        }

        return errorHandler.throwError(error);
    }
};

const createNew = async (ownerId, name, description, schema, private) => {
    try {
        const isTaken = await Randomizer.find({ name }, "_id");
        if (isTaken.length !== 0) {
            throw new ValidationError({ name: "Name is already taken." });
        }
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
        return await newRandomizer.save();

    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            throw new ValidationError({ data: "One or more of the data is invalid or missing." });
        }
        return errorHandler.throwError(error);
    }
};

const likeRandomizer = async (randomizerId, account) => {

    const hasLike = account.meta.likes.some(objId => {
        return objId.toString() == randomizerId.toString();
    });

    const inc = hasLike ? -1 : 1;
    if (hasLike === false) {
        await Account.findOneAndUpdate({ _id: account._id }, { $push: { "meta.likes": randomizerId } });
    } else {
        await Account.findOneAndUpdate({ _id: account._id }, { $pull: { "meta.likes": randomizerId } });
    }

    await Randomizer.findByIdAndUpdate(randomizerId, { $inc: { "meta.likes": inc } }).exec();

    return !hasLike;

};

const favoriteRandomizer = async (randomizerId, account) => {

    const hasFavorite = account.meta.favorites.some(objId => {
        return objId.toString() == randomizerId.toString();
    });

    const inc = hasFavorite ? -1 : 1;
    if (hasFavorite === false) {
        await Account.findOneAndUpdate({ _id: account._id }, { $push: { "meta.favorites": randomizerId } });
    } else {
        await Account.findOneAndUpdate({ _id: account._id }, { $pull: { "meta.favorites": randomizerId } });
    }

    await Randomizer.findByIdAndUpdate(randomizerId, { $inc: { "meta.favorites": inc } }).exec();

    return !hasFavorite;
};

module.exports = {
    fetch,
    createNew,
    findById,
    likeRandomizer,
    favoriteRandomizer,
    fetchByOwnerId,
    fetchManyById
};