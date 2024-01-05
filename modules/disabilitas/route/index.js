const express = require("express");
const router = express.Router();

const {
	getDisabilitas,
	getDisabilitasById,
	formCreate,
	formUpdate,
	createDisabilitas,
	updateDisabilitas,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getDisabilitas);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getDisabilitasById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createDisabilitas
);
router.put("/", updateAll);
router.put("/:id", updateDisabilitas);

module.exports = router;
