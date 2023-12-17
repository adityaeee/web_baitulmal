const { Muallaf, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMuallaf = async (req, res) => {
  try {
    const muallaf = await Muallaf.findAll();
    res.status(200).json(muallaf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMuallaf = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Muallaf.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateMuallaf = async (req, res) => {
  const data = req.body;
  let muallaf = await Muallaf.findOne({ where: { NIK: req.body.NIK } });
  muallaf.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "12_tambahMuallaf",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const muallaf = await Muallaf.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "12_editMuallaf",
    dataLayout(req, {
      muallaf,
    })
  );
};

module.exports = {
  getMuallaf,
  formCreate,
  formUpdate,
  createMuallaf,
  updateMuallaf,
};
