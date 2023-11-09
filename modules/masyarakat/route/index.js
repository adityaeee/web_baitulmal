const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const { addSchema } = require("../constans/validatorSchema");

const {
  getMasyarakat,
  createMasyarakat,
  getMasyarakatById,
  updateMasyarakatById,
  deleteMasyarakatById,
  formUpdate,
  formCreate,
} = require("../controller/index");

router.get("/", getMasyarakat);
router.post("/", validate(addSchema), createMasyarakat);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getMasyarakatById);
router.put("/:NIK", updateMasyarakatById);
router.delete("/:NIK", deleteMasyarakatById);

module.exports = router;
