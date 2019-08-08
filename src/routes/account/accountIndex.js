const router = require("express").Router();

const createAccount = require("./createAccount");
const doesExists = require("./exists");
const getAccount = require("./getAccount");

router.post("/create", createAccount);
router.get("/exists", doesExists);
router.get("/info", getAccount);

module.exports = router;