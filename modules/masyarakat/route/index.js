const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const { addSchema, updateSchema } = require("../constans/validatorSchema");
const authentication = require("../../../middleware/auth");

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
router.post(
	"/",
	authentication(["gampong"]),
	validate(addSchema),
	createMasyarakat
);
router.get("/tambah", authentication(["gampong"]), formCreate);
router.get("/edit/:NIK", authentication(["gampong"]), formUpdate);
router.get("/:NIK", getMasyarakatById);
router.put("/:NIK", validate(updateSchema), updateMasyarakatById);
router.delete("/:NIK", deleteMasyarakatById);

module.exports = router;
