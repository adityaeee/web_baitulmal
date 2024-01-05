const express = require("express");
const router = express.Router();

const {
	getMiskin,
	getMiskinById,
	formCreate,
	formUpdate,
	createMiskin,
	updateMiskin,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getMiskin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getMiskinById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createMiskin
);
router.put("/", updateAll);
router.put("/:id", updateMiskin);

module.exports = router;
