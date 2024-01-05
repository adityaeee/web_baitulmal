const express = require("express");
const router = express.Router();

const {
	getSantriMuallaf,
	getSantriMuallafById,
	formCreate,
	formUpdate,
	createSantriMuallaf,
	updateSantriMuallaf,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriMuallaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getSantriMuallafById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createSantriMuallaf
);
router.put("/", updateAll);
router.put("/:id", updateSantriMuallaf);

module.exports = router;
