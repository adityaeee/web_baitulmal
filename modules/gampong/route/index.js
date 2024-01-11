const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const { updateSchema } = require("../constans/validatorSchema");

const authentication = require("../../../middleware/auth");

const {
	getGampong,
	getGampongById,
	formUpdate,
	updateGampongById,
	deleteGamponById,
} = require("../controller/index");

router.get("/", getGampong);
router.get(
	"/:kode_gampong",
	authentication(["gampong", "admin", "staf"]),
	getGampongById
);
router.get(
	"/edit/:kode_gampong",
	authentication(["gampong", "admin"]),
	formUpdate
);
router.put(
	"/:kode_gampong",
	authentication(["gampong", "admin"]),
	validate(updateSchema),
	updateGampongById
);

router.delete("/:kode_gampong", authentication(["admin"]), deleteGamponById);

module.exports = router;
