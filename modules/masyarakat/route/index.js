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
	reset,
	resetAll,
} = require("../controller/index");

router.get("/", getMasyarakat);
router.post("/", validate(addSchema), createMasyarakat);
router.get("/tambah", authentication(["gampong"]), formCreate);
router.get("/edit/:NIK", authentication(["gampong"]), formUpdate);
router.get("/:NIK", getMasyarakatById);
router.put("/reset/all", authentication(["staf"]), resetAll);
router.put("/reset/:NIK", authentication(["staf"]), reset);
router.put(
	"/:NIK",
	authentication(["gampong"]),
	validate(updateSchema),
	updateMasyarakatById
);
router.delete("/:NIK", authentication(["gampong"]), deleteMasyarakatById);

module.exports = router;
