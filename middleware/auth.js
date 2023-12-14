const { dataLayout } = require("../utils/index");

const authentication = (roleAccess) => {
  return async (req, res, next) => {
    try {
      const user = req.session.user;

      if (roleAccess.includes(user.role)) {
        return next();
      }
      throw Error("Access Denied!!!");
    } catch (error) {
      req.flash("msg", `Data berhasil diupdate`);
      res.render("1_daftarPenerima", dataLayout(req, {}));
      // res.status(403).json({ message: "Access Denied" });
    }
  };
};

module.exports = authentication;
