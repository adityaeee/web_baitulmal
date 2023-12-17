const { Disabilitas, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getDisabilitas = async (req, res) => {
  try {
    const disabilitas = await Disabilitas.findAll();
    res.status(200).json(disabilitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDisabilitas = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Disabilitas.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateDisabilitas = async (req, res) => {
  const data = req.body;
  let disabilitas = await Disabilitas.findOne({ where: { NIK: req.body.NIK } });
  disabilitas.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "11_tambahDisabilitas",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const disabilitas = await Disabilitas.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "11_editDisabilitas",
    dataLayout(req, {
      disabilitas,
    })
  );
};

module.exports = {
  getDisabilitas,
  formCreate,
  formUpdate,
  createDisabilitas,
  updateDisabilitas,
};
