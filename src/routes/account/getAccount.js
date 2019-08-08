const authenticateUser = require("../../middleware/authenticateUser");

const getAccount = [
    authenticateUser,
    (req, res, next) => {
        console.log(req.account);
        return res.json({
            adminLevel: req.account.adminLevel,
            likes: req.account.meta.likes,
            favorites: req.account.meta.favorites,
            randomizers: req.account.randomizers
        });
    }
];

module.exports = getAccount;