const express = require("express");
const router = express.Router();

const {
	getMiskinInsidentil,
	getMiskinInsidentilById,
	formCreate,
	formUpdate,
	createMiskinInsidentil,
	updateMiskinInsidentil,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMiskinInsidentil);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getMiskinInsidentilById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createMiskinInsidentil
);
router.put("/", updateAll);
router.put("/:id", updateMiskinInsidentil);

module.exports = router;
