const express = require("express");
const router = express.Router();

const {
	getSantriBerprestasi,
	getSantriBerprestasiById,
	formCreate,
	formUpdate,
	createSantriBerprestasi,
	updateSantriBerprestasi,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriBerprestasi);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getSantriBerprestasiById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createSantriBerprestasi
);
router.put("/", updateAll);
router.put("/:id", updateSantriBerprestasi);

module.exports = router;
