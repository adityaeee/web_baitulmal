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
} = require("../controller/index");

router.get("/", getGampong);
router.get(
  "/:kode_gampong",
  authentication(["gampong", "admin"]),
  getGampongById
);
router.get(
  "/edit/:kode_gampong",
  authentication(["gampong", "admin"]),
  formUpdate
);
router.put(
  "/:id",
  authentication(["gampong", "admin"]),
  validate(updateSchema),
  updateGampongById
);

module.exports = router;