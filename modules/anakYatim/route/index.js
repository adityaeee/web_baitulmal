const express = require("express");
const router = express.Router();

const {
  getAnakYatim,
  formCreate,
  formUpdate,
  createAnakYatim,
  updateAnakYatim,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getAnakYatim);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createAnakYatim);
router.put("/:id", updateAnakYatim);

module.exports = router;
