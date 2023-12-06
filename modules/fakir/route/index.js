const express = require("express");
const router = express.Router();

const {
  getFakir,
  formCreate,
  formUpdate,
  createFakir,
  updateFakir,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getFakir);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post(
  "/",
  // uploadFile("./public/images/fakir").single("surat_domisili"),
  // uploadFile("./public/images/fakir").single("surat_ketfakir"),
  createFakir
);
router.put("/:id", updateFakir);

module.exports = router;
