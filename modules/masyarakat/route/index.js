const express = require("express");
const router = express.Router();

const {
	getMasyarakat,
	createMasyarakat,
	getMasyarakatById,
	updateMasyarakatById,
	deleteMasyarakatById,
} = require("../controller/index");

router.get("/", getMasyarakat);
router.post("/", createMasyarakat);
router.get("/:NIK", getMasyarakatById);
router.put("/:NIK", updateMasyarakatById);
router.delete("/:NIK", deleteMasyarakatById);

module.exports = router;
