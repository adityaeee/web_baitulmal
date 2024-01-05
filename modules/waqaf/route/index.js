const express = require("express");
const router = express.Router();

const {
	getWaqaf,
	getWaqafById,
	formCreate,
	formUpdate,
	createWaqaf,
	updateWaqaf,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getWaqaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getWaqafById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createWaqaf
);
router.put("/", updateAll);
router.put("/:id", updateWaqaf);

module.exports = router;
