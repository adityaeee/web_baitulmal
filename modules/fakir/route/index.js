const express = require("express");
const router = express.Router();

const {
	getFakir,
	getFakirById,
	formCreate,
	formUpdate,
	createFakir,
	updateFakir,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getFakir);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getFakirById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createFakir
);
router.put("/", updateAll);
router.put("/:id", updateFakir);

module.exports = router;
