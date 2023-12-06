const { Fakir, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

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
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Fakir.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateFakir = async (req, res) => {
  const data = req.body;
  // console.log(data);
  res.json(data);
};

const formCreate = async (req, res) => {
  res.render(
    "4_tambahFakir",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const fakir = await Fakir.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "4_editFakir",
    dataLayout(req, {
      fakir,
    })
  );
};

module.exports = { getFakir, formCreate, formUpdate, createFakir, updateFakir };
