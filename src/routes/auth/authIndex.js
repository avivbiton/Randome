const router = require("express").Router();

const registerEndpoint = require("./register");

router.post("/register", registerEndpoint);

module.exports = router;