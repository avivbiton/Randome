const router = require("express").Router();

const createAccount = require("./createAccount");

router.post("/create", createAccount);

module.exports = router;