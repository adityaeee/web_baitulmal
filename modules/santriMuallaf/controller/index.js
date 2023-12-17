const { SantriMuallaf, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getSantriMuallaf = async (req, res) => {
  try {
    const santriMuallaf = await SantriMuallaf.findAll();
    res.status(200).json(santriMuallaf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSantriMuallaf = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await SantriMuallaf.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateSantriMuallaf = async (req, res) => {
  const data = req.body;
  let santriMuallaf = await SantriMuallaf.findOne({ where: { NIK: req.body.NIK } });
  santriMuallaf.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "14_tambahSantriMuallaf",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const santriMuallaf = await SantriMuallaf.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "14_editSantriMuallaf",
    dataLayout(req, {
      santriMuallaf,
    })
  );
};

module.exports = {
  getSantriMuallaf,
  formCreate,
  formUpdate,
  createSantriMuallaf,
  updateSantriMuallaf,
};
