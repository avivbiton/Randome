const admin = require("firebase-admin");
const AuthenticationError = require("../Errors/AuthenticationError");
const Account = require("../Models/Account");

module.exports = async (req, res, next) => {
    const authToken = req.get("Authorization");
    try {
        const decoded = await admin.auth().verifyIdToken(authToken);
        req.user = decoded;
        try {
            const data = await Account.find({ userId: decoded.uid }).lean().exec();
            req.account = data[0];
        } catch (error) {
            req.account = null;
        }
        next();
    } catch (error) {
        next(new AuthenticationError());
    }
};