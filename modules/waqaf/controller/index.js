const { Waqaf, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getWaqaf = async (req, res) => {
  try {
    const waqaf = await Waqaf.findAll();
    res.status(200).json(waqaf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWaqaf = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Waqaf.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateWaqaf = async (req, res) => {
  const data = req.body;
  let waqaf = await Waqaf.findOne({ where: { NIK: req.body.NIK } });
  waqaf.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "18_tambahWaqaf",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const waqaf = await Waqaf.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "18_editWaqaf",
    dataLayout(req, {
      waqaf,
    })
  );
};

module.exports = {
  getWaqaf,
  formCreate,
  formUpdate,
  createWaqaf,
  updateWaqaf,
};
