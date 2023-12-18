const express = require("express");
const router = express.Router();

const {
  getFakir,
  getFakirById,
  formCreate,
  formUpdate,
  createFakir,
  updateFakir,
  updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getFakir);
router.get("/:NIK", getFakirById);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post(
  "/",
  // uploadFile("./public/images/fakir").single("surat_domisili"),
  // uploadFile("./public/images/fakir").single("surat_ketfakir"),
  createFakir
);
router.put("/:id", updateFakir);
router.put("/", updateAll);

module.exports = router;
