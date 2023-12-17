const express = require("express");
const router = express.Router();

const { clusterFakir } = require("../helper/index");

router.post("/fakir", clusterFakir);

module.exports = router;
