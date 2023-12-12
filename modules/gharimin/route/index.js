const express = require("express");
const router = express.Router();

const {
  getGharimin,
  formCreate,
  formUpdate,
  createGharimin,
  updateGharimin,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getGharimin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createGharimin);
router.put("/:id", updateGharimin);

module.exports = router;
