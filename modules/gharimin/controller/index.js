const { Gharimin, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getGharimin = async (req, res) => {
  try {
    const gharimin = await Gharimin.findAll();
    res.status(200).json(gharimin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGharimin = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Gharimin.create(data);
  req.session.data = {};
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateGharimin = async (req, res) => {
  const data = req.body;
  let gharimin = await Gharimin.findByPk(req.params.id);
  gharimin.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "15_tambahGharimin",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const gharimin = await Gharimin.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "15_editGharimin",
    dataLayout(req, {
      gharimin,
    })
  );
};

module.exports = {
  getGharimin,
  formCreate,
  formUpdate,
  createGharimin,
  updateGharimin,
};
