const router = require("express").Router();

const fetchLatest = require("./fetch");
const createNew = require("./createNew");

router.get("/latest", fetchLatest);
router.post("/create", createNew);

module.exports = router;