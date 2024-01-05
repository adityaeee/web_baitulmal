const express = require("express");
const router = express.Router();

const {
	getPelajarMiskin,
	getPelajarMiskinById,
	formCreate,
	formUpdate,
	createPelajarMiskin,
	updatePelajarMiskin,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getPelajarMiskin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getPelajarMiskinById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createPelajarMiskin
);
router.put("/", updateAll);
router.put("/:id", updatePelajarMiskin);

module.exports = router;
