const express = require("express");
const router = express.Router();

const {
  getPelajarMiskin,
  formCreate,
  formUpdate,
  createPelajarMiskin,
  updatePelajarMiskin,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getPelajarMiskin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createPelajarMiskin);
router.put("/:id", updatePelajarMiskin);

module.exports = router;
