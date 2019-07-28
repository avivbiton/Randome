const router = require("express").Router();

const currentEndpoint = require("./current");

router.get("/current", currentEndpoint);

module.exports = router;