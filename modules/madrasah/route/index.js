const express = require("express");
const router = express.Router();

const {
	getMadrasah,
	getMadrasahById,
	formCreate,
	formUpdate,
	createMadrasah,
	updateMadrasah,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMadrasah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getMadrasahById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createMadrasah
);
router.put("/", updateAll);
router.put("/:id", updateMadrasah);

module.exports = router;
