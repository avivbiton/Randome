const router = require("express").Router();

const createAccount = require("./createAccount");
const doesExists = require("./exists");

router.post("/create", createAccount);
router.get("/exists", doesExists);

module.exports = router;