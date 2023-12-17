const { PelajarRantau, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getPelajarRantau = async (req, res) => {
  try {
    const pelajarRantau = await PelajarRantau.findAll();
    res.status(200).json(pelajarRantau);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPelajarRantau = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await PelajarRantau.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updatePelajarRantau = async (req, res) => {
  const data = req.body;
  let pelajarRantau = await PelajarRantau.findOne({ where: { NIK: req.body.NIK } });
  pelajarRantau.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "19_tambahPelajarRantau",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const pelajarRantau = await PelajarRantau.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "19_editPelajarRantau",
    dataLayout(req, {
      pelajarRantau,
    })
  );
};

module.exports = {
  getPelajarRantau,
  formCreate,
  formUpdate,
  createPelajarRantau,
  updatePelajarRantau,
};
