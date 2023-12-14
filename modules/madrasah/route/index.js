const express = require("express");
const router = express.Router();

const {
  getMadrasah,
  formCreate,
  formUpdate,
  createMadrasah,
  updateMadrasah,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMadrasah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createMadrasah);
router.put("/:id", updateMadrasah);

module.exports = router;
