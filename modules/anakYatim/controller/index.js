const { AnakYatim, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getAnakYatim = async (req, res) => {
  try {
    const anakYatim = await AnakYatim.findAll();
    res.status(200).json(anakYatim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAnakYatim = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await AnakYatim.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateAnakYatim = async (req, res) => {
  const data = req.body;
  let anakYatim = await AnakYatim.findOne({ where: { NIK: req.body.NIK } });
  anakYatim.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "10_tambahAnakyatim",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const anakYatim = await AnakYatim.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "10_editAnakYatim",
    dataLayout(req, {
      anakYatim,
    })
  );
};

module.exports = {
  getAnakYatim,
  formCreate,
  formUpdate,
  createAnakYatim,
  updateAnakYatim,
};
