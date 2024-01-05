const express = require("express");
const router = express.Router();

const {
	getGuruDayah,
	getGuruDayahById,
	formCreate,
	formUpdate,
	createGuruDayah,
	updateGuruDayah,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getGuruDayah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getGuruDayahById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createGuruDayah
);
router.put("/", updateAll);
router.put("/:id", updateGuruDayah);

module.exports = router;
