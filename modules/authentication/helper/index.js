const { Gampong, Admin } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const formRegister = async (req, res) => {
  res.render("3_registrasiGampong", dataLayout(req, {}));
};

const register = async (req, res) => {
  try {
    if (req.errorValidation) {
      res.render(
        "3_registrasi",
        dataLayout({
          errors: req.errorValidation.errors,
        })
      );
      return;
    }
    req.flash(
      "msg",
      `Data gampong ${req.body.nama_gampong} berhasil ditambahkan`
    );
    await Gampong.create(req.body);
    // console.log(req.body);
    res.redirect("/auth/login/gampong");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const formLoginGampong = async (req, res) => {
  if (req.session?.user) {
    res.redirect("/masyarakat");
    return;
  }
  res.render("3_loginGampong", dataLayout(req, {}));
};

const loginGampong = async (req, res) => {
  try {
    if (req.errorValidation) {
      res.render(
        "3_loginGampong",
        dataLayout({
          errors: req.errorValidation.errors,
        })
      );
      return;
    }

    const gampong = await Gampong.findByPk(req.body.kode_gampong);
    req.flash(
      "msg",
      `Saleum Teuka ${gampong.nama} Bak Website Pembagian Zaqat`
    );

    req.session.user = { ...gampong.dataValues, role: req.body.role };

    res.redirect("/masyarakat");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const formLoginAdmin = async (req, res) => {
  if (req.session?.user) {
    res.redirect("/masyarakat");
    return;
  }
  res.render("0_loginAdmin", dataLayout(req, {}));
};

const loginAdmin = async (req, res) => {
  try {
    if (req.errorValidation) {
      res.render(
        "0_loginAdmin",
        dataLayout({
          errors: req.errorValidation.errors,
        })
      );
      return;
    }

    const admin = await Admin.findOne({
      where: { username: req.body.username },
    });
    req.flash("msg", `Saleum Teuka ${admin.nama} Bak Website Pembagian Zaqat`);
    req.session.user = { ...admin.dataValues, role: req.body.role };
    res.redirect("/masyarakat");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  // req.flash("msg", `Terima Kasih`);
  req.session.destroy();
  res.redirect("/masyarakat");
};

module.exports = {
  formLoginGampong,
  formLoginAdmin,
  formRegister,
  register,
  loginGampong,
  loginAdmin,
  logout,
};
