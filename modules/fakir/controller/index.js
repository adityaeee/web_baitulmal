const { Fakir } = require("../../../models");

const getFakir = async (req, res) => {
  try {
    const fakir = await Fakir.findAll();
    // res.render("4_daftarFakir", {
    //   layout: "layouts/main-layouts",
    //   msg: req.flash("msg"),
    //   title: "Zaqat",
    //   fakir,
    // });
    res.status(200).json(fakir);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakir = async (req, res) => {
  try {
    console.log("12345678", req.body);
    await Fakir.create(req.body);
    // req.flash("msg", `Data berhasil ditambahkan`);
    // res.redirect("/masyarakat");
  } catch (error) {
    console.log({ error });
    // res.status(404).json({ message: error.message });
  }
};

const formCreate = async (req, res) => {
  res.render("4_tambahFakir", {
    layout: "layouts/main-layouts",
    title: "Zaqat",
    NIK: req.query.NIK,
  });
  res.status(200);
};

module.exports = { getFakir, formCreate, createFakir };
