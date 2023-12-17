const { PelajarMiskin, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getPelajarMiskin = async (req, res) => {
  try {
    const pelajarMiskin = await PelajarMiskin.findAll();
    res.status(200).json(pelajarMiskin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPelajarMiskin = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await PelajarMiskin.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updatePelajarMiskin = async (req, res) => {
  const data = req.body;
  let pelajarMiskin = await PelajarMiskin.findOne({ where: { NIK: req.body.NIK } });
  pelajarMiskin.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "13_tambahPelajarMiskin",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const pelajarMiskin = await PelajarMiskin.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "13_editPelajarMiskin",
    dataLayout(req, {
      pelajarMiskin,
    })
  );
};

module.exports = {
  getPelajarMiskin,
  formCreate,
  formUpdate,
  createPelajarMiskin,
  updatePelajarMiskin,
};
