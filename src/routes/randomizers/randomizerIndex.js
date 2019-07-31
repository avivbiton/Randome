const router = require("express").Router();

const fetchLatest = require("./fetch");
const createNew = require("./createNew");
const fetchById = require("./fetchById");

router.get("/latest", fetchLatest);
router.get("/get/:id", fetchById);
router.post("/create", createNew);

module.exports = router;