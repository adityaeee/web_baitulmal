const express = require("express");
const router = express.Router();

const {
  getSantriBerprestasi,
  formCreate,
  formUpdate,
  createSantriBerprestasi,
  updateSantriBerprestasi,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriBerprestasi);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createSantriBerprestasi);
router.put("/:id", updateSantriBerprestasi);

module.exports = router;
