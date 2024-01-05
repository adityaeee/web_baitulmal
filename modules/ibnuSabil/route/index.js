const express = require("express");
const router = express.Router();

const {
	getIbnuSabil,
	getIbnuSabilById,
	formCreate,
	formUpdate,
	createIbnuSabil,
	updateIbnuSabil,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getIbnuSabil);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getIbnuSabilById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createIbnuSabil
);
router.put("/", updateAll);
router.put("/:id", updateIbnuSabil);

module.exports = router;
