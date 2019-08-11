const authenticateUser = require("../../middleware/authenticateUser");
const Account = require("../../Models/Account");

const accountExists = [authenticateUser,
    async (req, res, next) => {
        try {
            const docs = await Account.find({ userId: req.user.uid }).lean().exec();
            if (docs.length === 0)
                return res.status(404).json({ error: "Your user id is not attached to any account." });

            return res.status(200).send();

        } catch (error) {
            next(error);
        }

    }];

module.exports = accountExists;

