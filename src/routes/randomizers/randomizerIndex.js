const router = require("express").Router();

const fetch = require("./fetch");
const createNew = require("./createNew");
const fetchById = require("./fetchById");
const likeEndpoint = require("./like");
const favoriteEndpoint = require("./favorite");
const fetchOwned = require("./fetchOwned");
const fetchMeta = require("./fetchMeta");

router.get("/fetch", fetch);
router.get("/get/:id", fetchById);
router.get("/own", fetchOwned);
router.get("/meta", fetchMeta);

router.post("/create", createNew);
router.post("/like", likeEndpoint);
router.post("/favorite", favoriteEndpoint);

module.exports = router;