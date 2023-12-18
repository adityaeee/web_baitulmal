const express = require("express");
const router = express.Router();

const { validate } = require("../../../middleware/index");
const {
  registerSchema,
  loginSchemaGampong,
  loginSchemaAdmin,
  loginSchemaStaf,
} = require("../constans/validatorSchema");

const {
  register,
  formRegister,
  formLoginGampong,
  formLoginStaf,
  loginGampong,
  formLoginAdmin,
  loginAdmin,
  loginStaf,
  logout,
} = require("../helper/index");

router.get("/register", formRegister);
router.post("/register", validate(registerSchema), register);
router.get("/login/gampong", formLoginGampong);
router.post("/login/gampong", validate(loginSchemaGampong), loginGampong);
router.get("/login/admin", formLoginAdmin);
router.post("/login/admin", validate(loginSchemaAdmin), loginAdmin);
router.get("/login/staf", formLoginStaf);
router.post("/login/staf", validate(loginSchemaStaf), loginStaf);
router.get("/logout/", logout);

module.exports = router;
