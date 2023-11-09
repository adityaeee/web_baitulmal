const express = require("express");
const router = express.Router();

const { getFakir, formCreate, createFakir } = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getFakir);
router.get("/tambah", formCreate);
router.post(
  "/",
  //   uploadFile("/images/fakir").single("surat_domisili"),
  createFakir
);

module.exports = router;
