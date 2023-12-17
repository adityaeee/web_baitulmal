const express = require("express");
const router = express.Router();

const {
  getWaqaf,
  formCreate,
  formUpdate,
  createWaqaf,
  updateWaqaf,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getWaqaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createWaqaf);
router.put("/:id", updateWaqaf);

module.exports = router;
