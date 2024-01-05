const express = require("express");
const router = express.Router();

const {
	getAnakYatim,
	getAnakYatimById,
	formCreate,
	formUpdate,
	createAnakYatim,
	updateAnakYatim,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getAnakYatim);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getAnakYatimById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createAnakYatim
);
router.put("/", updateAll);
router.put("/:id", updateAnakYatim);

module.exports = router;
