const express = require("express");
const router = express.Router();

const {
  getSantriMuallaf,
  formCreate,
  formUpdate,
  createSantriMuallaf,
  updateSantriMuallaf,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriMuallaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createSantriMuallaf);
router.put("/:id", updateSantriMuallaf);

module.exports = router;
