const express = require("express");
const router = express.Router();

const {
	getPelajarRantau,
	getPelajarRantauById,
	formCreate,
	formUpdate,
	createPelajarRantau,
	updatePelajarRantau,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getPelajarRantau);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getPelajarRantauById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createPelajarRantau
);
router.put("/", updateAll);
router.put("/:id", updatePelajarRantau);

module.exports = router;
