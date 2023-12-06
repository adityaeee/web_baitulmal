const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const {
  registerSchema,
  loginSchemaGampong,
  loginSchemaAdmin
} = require("../constans/validatorSchema");

const {
  register,
  formRegister,
  formLoginGampong,
  loginGampong,
  formLoginAdmin,
  loginAdmin,
  logout,
} = require("../helper/index");

router.get("/register", formRegister);
router.post("/register", validate(registerSchema), register);
router.get("/login/gampong", formLoginGampong);
router.post("/login/gampong", validate(loginSchemaGampong), loginGampong);
router.get("/login/admin", formLoginAdmin);
router.post("/login/admin", validate(loginSchemaAdmin), loginAdmin);
router.get("/logout/", logout);

module.exports = router;
