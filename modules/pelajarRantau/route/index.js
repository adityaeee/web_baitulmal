const express = require("express");
const router = express.Router();

const {
  getPelajarRantau,
  formCreate,
  formUpdate,
  createPelajarRantau,
  updatePelajarRantau,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getPelajarRantau);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createPelajarRantau);
router.put("/:id", updatePelajarRantau);

module.exports = router;
