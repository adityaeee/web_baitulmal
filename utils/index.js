function dataLayout(req, data) {
  // console.log(req.cookies);
  return {
    layout: "layouts/main-layouts",
    title: "Zaqat",
    msg: req.flash("msg"),
    session: req.session,
    ...data,
    // user: req.cookies?.user ? JSON.parse(req.cookies?.user) : {},
  };
}

module.exports = { dataLayout };
