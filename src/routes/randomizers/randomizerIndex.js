const router = require("express").Router();

const fetch = require("./fetch");
const createNew = require("./createNew");
const fetchById = require("./fetchById");
const likeEndpoint = require("./like");

router.get("/fetch", fetch);
router.get("/get/:id", fetchById);
router.post("/create", createNew);
router.post("/like", likeEndpoint);

module.exports = router;