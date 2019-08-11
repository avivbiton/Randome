const authenticateUser = require("../../middleware/authenticateUser");
const accountService = require("../../services/accountService");

const createAccount = [authenticateUser,
    async (req, res, next) => {
        try {
            const data = await accountService.createAccount(req.user.uid);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }];

module.exports = createAccount;