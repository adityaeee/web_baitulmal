const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const {
  registerSchema,
  loginSchemaGampong,
} = require("../constans/validatorSchema");

const {
  register,
  formRegister,
  formLoginGampong,
  loginGampong,
} = require("../helper/index");

router.get("/register", formRegister);
router.post("/register", validate(registerSchema), register);
router.get("/login/gampong", formLoginGampong);
router.post("/login/gampong", validate(loginSchemaGampong), loginGampong);

module.exports = router;
