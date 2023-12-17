const { GuruDayah, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getGuruDayah = async (req, res) => {
  try {
    const guruDayah = await GuruDayah.findAll();
    res.status(200).json(guruDayah);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGuruDayah = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await GuruDayah.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateGuruDayah = async (req, res) => {
  const data = req.body;
  let guruDayah = await GuruDayah.findOne({ where: { NIK: req.body.NIK } });
  guruDayah.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "7_tambahGuruDayah",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const guruDayah = await GuruDayah.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "7_editGuruDayah",
    dataLayout(req, {
      guruDayah,
    })
  );
};

module.exports = {
  getGuruDayah,
  formCreate,
  formUpdate,
  createGuruDayah,
  updateGuruDayah,
};
