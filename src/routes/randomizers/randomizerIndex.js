const router = require("express").Router();

const fetch = require("./fetch");
const createNew = require("./createNew");
const fetchById = require("./fetchById");
const likeEndpoint = require("./like");
const favoriteEndpoint = require("./favorite");
const fetchOwned = require("./fetchOwned");
const fetchMeta = require("./fetchMeta");
const deteleEndpount = require("./delete");

router.get("/fetch", fetch);
router.get("/:id", fetchById);
router.get("/fetch/own", fetchOwned);
router.get("/fetch/meta", fetchMeta);

router.post("/create", createNew);
router.post("/like", likeEndpoint);
router.post("/favorite", favoriteEndpoint);

router.delete("/:id", deteleEndpount);

module.exports = router;