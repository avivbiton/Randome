const admin = require("firebase-admin");
const AuthenticationError = require("../Errors/AuthenticationError");
const Account = require("../Models/Account");

module.exports = (required = true) => async (req, res, next) => {
    const authToken = req.get("Authorization");
    try {
        const decoded = await admin.auth().verifyIdToken(authToken);
        req.user = decoded;
        console.log(req.user);
        try {
            console.log("finding account");
            const data = await Account.find({ userId: decoded.uid }).lean().exec();
            console.log("found " + data);
            req.account = data[0];
        } catch (error) {
            console.log(error);
            req.account = null;
        }
        next();
    } catch (error) {
        if (required)
            next(new AuthenticationError());
        else {
            req.account = null;
            req.user = null;
            next();
        }
    }
};