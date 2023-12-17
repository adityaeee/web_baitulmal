const { SantriDayahLuar, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getSantriDayahLuar = async (req, res) => {
  try {
    const santriDayahLuar = await SantriDayahLuar.findAll();
    res.status(200).json(santriDayahLuar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSantriDayahLuar = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await SantriDayahLuar.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateSantriDayahLuar = async (req, res) => {
  const data = req.body;
  let santriDayahLuar = await SantriDayahLuar.findOne({ where: { NIK: req.body.NIK } });
  santriDayahLuar.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "9_tambahSantriDayahLuar",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const santriDayahLuar = await SantriDayahLuar.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "9_editSantriDayahLuar",
    dataLayout(req, {
      santriDayahLuar,
    })
  );
};

module.exports = {
  getSantriDayahLuar,
  formCreate,
  formUpdate,
  createSantriDayahLuar,
  updateSantriDayahLuar,
};
