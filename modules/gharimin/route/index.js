const express = require("express");
const router = express.Router();

const {
	getGharimin,
	getGhariminById,
	formCreate,
	formUpdate,
	createGharimin,
	updateGharimin,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getGharimin);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getGhariminById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createGharimin
);
router.put("/", updateAll);
router.put("/:id", updateGharimin);

module.exports = router;
