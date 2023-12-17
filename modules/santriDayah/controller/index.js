const { SantriDayah, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getSantriDayah = async (req, res) => {
  try {
    const santriDayah = await SantriDayah.findAll();
    res.status(200).json(santriDayah);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSantriDayah = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await SantriDayah.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateSantriDayah = async (req, res) => {
  const data = req.body;
  let santriDayah = await SantriDayah.findOne({ where: { NIK: req.body.NIK } });
  santriDayah.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "8_tambahSantriDayah",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const santriDayah = await SantriDayah.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "8_editSantriDayah",
    dataLayout(req, {
      santriDayah,
    })
  );
};

module.exports = {
  getSantriDayah,
  formCreate,
  formUpdate,
  createSantriDayah,
  updateSantriDayah,
};
