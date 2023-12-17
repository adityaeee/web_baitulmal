const express = require("express");
const router = express.Router();

const {
  getSantriDayahLuar,
  formCreate,
  formUpdate,
  createSantriDayahLuar,
  updateSantriDayahLuar,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriDayahLuar);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createSantriDayahLuar);
router.put("/:id", updateSantriDayahLuar);

module.exports = router;
