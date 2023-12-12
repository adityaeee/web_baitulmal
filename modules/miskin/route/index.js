const express = require("express");
const router = express.Router();

const {
  getMiskin,
  formCreate,
  formUpdate,
  createMiskin,
  updateMiskin,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMiskin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createMiskin);
router.put("/:id", updateMiskin);

module.exports = router;
