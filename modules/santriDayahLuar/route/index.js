const express = require("express");
const router = express.Router();

const {
	getSantriDayahLuar,
	getSantriDayahLuarById,
	formCreate,
	formUpdate,
	createSantriDayahLuar,
	updateSantriDayahLuar,
	updateAll,
} = require("../controller/index");
const { uploadFile } = require("../../../middleware");

router.get("/", getSantriDayahLuar);
router.get("/tambah", formCreate);
router.get("/edit/:NIK", formUpdate);
router.get("/:NIK", getSantriDayahLuarById);
router.post(
	"/",
	// uploadFile("./public/images/fakir").single("surat_domisili"),
	// uploadFile("./public/images/fakir").single("surat_ketfakir"),
	createSantriDayahLuar
);
router.put("/", updateAll);
router.put("/:id", updateSantriDayahLuar);

module.exports = router;
