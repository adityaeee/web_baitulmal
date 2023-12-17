const express = require("express");
const router = express.Router();

const {
  getMiskinInsidentil,
  formCreate,
  formUpdate,
  createMiskinInsidentil,
  updateMiskinInsidentil,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMiskinInsidentil);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createMiskinInsidentil);
router.put("/:id", updateMiskinInsidentil);

module.exports = router;
