const express = require("express");
const router = express.Router();

const {
  getSantriDayah,
  formCreate,
  formUpdate,
  createSantriDayah,
  updateSantriDayah,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriDayah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createSantriDayah);
router.put("/:id", updateSantriDayah);

module.exports = router;
