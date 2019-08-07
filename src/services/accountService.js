const Account = require("../../Models/Account");


async function createAccount(userId) {

    const newAccount = new Account({
        userId
    });

    const data = await newAccount.save();
    return data;

}

module.exports = {
    createAccount
};