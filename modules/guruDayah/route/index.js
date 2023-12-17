const express = require("express");
const router = express.Router();

const {
  getGuruDayah,
  formCreate,
  formUpdate,
  createGuruDayah,
  updateGuruDayah,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getGuruDayah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createGuruDayah);
router.put("/:id", updateGuruDayah);

module.exports = router;
