const router = require("express").Router();

const fetch = require("./fetch");
const createNew = require("./createNew");
const fetchById = require("./fetchById");

router.get("/fetch", fetch);
router.get("/get/:id", fetchById);
router.post("/create", createNew);

module.exports = router;