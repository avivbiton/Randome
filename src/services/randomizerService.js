const Randomizer = require("../Models/Randomizer");
const mongoose = require("mongoose");
const Account = require("../Models/Account");
const errorHandler = require("./errorHandler");
const MongooseError = require("mongoose").Error;
const ValidationError = require("../Errors/ValidationError");
const admin = require("firebase-admin");

const maxPerFetch = 100;

const fetch = async (search = {}, page = 0, sortBy = "createdAt") => {
    const skip = maxPerFetch * page;

    try {
        const docs = await Randomizer.find(search, "name description meta _id owner.name").skip(skip).limit(maxPerFetch)
            .sort({ [sortBy]: "desc" }).lean().exec();
        return docs;
    }
    catch (error) {
        return errorHandler.handleUnkownError(error);
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

        return await newRandomizer.save();

    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            throw new ValidationError("Data sent is invalid or missing", 400);
        }
        return errorHandler.handleUnkownError(error);
    }
};

/**
 * Increase / decrease a randomizer like counter by 1. returns true if increased otherwise returns false
 * @param {} randomizerId 
 * @param {*} account 
 */
const likeRandomizer = async (randomizerId, account) => {

    const hasLike = account.meta.likes.some(objId => {
        return objId.toString() == randomizerId.toString();
    });

    const update = hasLike ? { $inc: { "meta.likes": -1 } } : { $inc: { "meta.likes": 1 } };
    if (hasLike === false) {
        await Account.findOneAndUpdate({ _id: account._id }, { "meta.likes": [...account.meta.likes, randomizerId] });
    } else {
        const removedLike = account.meta.likes.filter(i => i.toString() !== randomizerId.toString());
        await Account.findOneAndUpdate({ _id: account._id }, { "meta.likes": removedLike });
    }

    await Randomizer.findByIdAndUpdate(randomizerId, update).exec();

    return !hasLike;

};

module.exports = {
    fetch,
    createNew,
    findById,
    likeRandomizer
};