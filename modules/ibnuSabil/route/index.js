const express = require("express");
const router = express.Router();

const {
  getIbnuSabil,
  formCreate,
  formUpdate,
  createIbnuSabil,
  updateIbnuSabil,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getIbnuSabil);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.post("/", createIbnuSabil);
router.put("/:id", updateIbnuSabil);

module.exports = router;
