const router = require("express").Router();

const registerEndpoint = require("./register");
const currentEndpoint = require("./current");

router.post("/register", registerEndpoint);
router.get("/current", currentEndpoint);

module.exports = router;