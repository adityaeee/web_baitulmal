const express = require("express");
const router = express.Router();

const {
  getMuallaf,
  formCreate,
  formUpdate,
  createMuallaf,
  updateMuallaf,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMuallaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createMuallaf);
router.put("/:id", updateMuallaf);

module.exports = router;
