const express = require("express");
const router = express.Router();

const {
	getMuallaf,
	getMuallafById,
	formCreate,
	formUpdate,
	createMuallaf,
	updateMuallaf,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMuallaf);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getMuallafById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createMuallaf
);
router.put("/", updateAll);
router.put("/:id", updateMuallaf);

module.exports = router;
