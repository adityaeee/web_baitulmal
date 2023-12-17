const express = require("express");
const router = express.Router();

const {
  getDisabilitas,
  formCreate,
  formUpdate,
  createDisabilitas,
  updateDisabilitas,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getDisabilitas);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createDisabilitas);
router.put("/:id", updateDisabilitas);

module.exports = router;
