const admin = require("firebase-admin");
const AuthenticationError = require("../Errors/AuthenticationError");
const Account = require("../Models/Account");

module.exports = async (req, res, next) => {
    const authToken = req.get("Authorization");
    try {
        const decoded = await admin.auth().verifyIdToken(authToken);
        req.user = decoded;
        try {
            req.account = await Account.find({ userId: decoded.uid }).lean().exec();
        } catch (error) {
            req.account = null;
        }
        next();
    } catch (error) {
        next(new AuthenticationError());
    }
};