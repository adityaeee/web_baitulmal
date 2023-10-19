const express = require("express");
const router = express.Router();

const { getAdmin, createAdmin } = require("../controller/index");

router.get("/", getAdmin);
router.post("/", createAdmin);

module.exports = router;
