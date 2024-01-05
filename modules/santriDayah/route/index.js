const express = require("express");
const router = express.Router();

const {
	getSantriDayah,
	getSantriDayahById,
	formCreate,
	formUpdate,
	createSantriDayah,
	updateSantriDayah,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriDayah);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getSantriDayahById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createSantriDayah
);
router.put("/", updateAll);
router.put("/:id", updateSantriDayah);

module.exports = router;
