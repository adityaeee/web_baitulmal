const express = require("express");

const authentication = require("../../../middleware/auth");
const router = express.Router();
const {
	getStaf,
	getStafById,
	formCreate,
	formUpdate,
	createStaf,
	updateStaf,
} = require("../controller");

router.get("/", authentication(["admin"]), getStaf);
router.get("/tambah", authentication(["admin"]), formCreate);
router.get("/edit/:NIK", authentication(["admin", "staf"]), formUpdate);
router.get("/:NIK", authentication(["admin", "staf"]), getStafById);
router.post("/", authentication(["admin"]), createStaf);
router.put("/:NIK", authentication(["admin"]), updateStaf);

module.exports = router;
