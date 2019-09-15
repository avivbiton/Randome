const router = require("express").Router();
const contactPost = require("./contactPost");

router.post("/", contactPost);

module.exports = router;