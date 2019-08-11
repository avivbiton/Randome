const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const accountSchema = new Schema({
    adminLevel: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    randomizers: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    meta: {
        likes: {
            type: [mongoose.SchemaTypes.ObjectId],
            default: []
        },
        favorites: {
            type: [mongoose.SchemaTypes.ObjectId],
            default: []
        }
    }
});


const Account = mongoose.model("Account", accountSchema);

module.exports = Account;