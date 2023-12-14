const { Madrasah, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMadrasah = async (req, res) => {
  try {
    const madrasah = await Madrasah.findAll();
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMadrasah = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await Madrasah.create(data);
  req.session.data = {};
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateMadrasah = async (req, res) => {
  const data = req.body;
  let madrasah = await Madrasah.findByPk(req.params.id);
  madrasah.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "17_tambahMadrasah",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const madrasah = await Madrasah.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "17_editMadrasah",
    dataLayout(req, {
      madrasah,
    })
  );
};

module.exports = {
  getMadrasah,
  formCreate,
  formUpdate,
  createMadrasah,
  updateMadrasah,
};
