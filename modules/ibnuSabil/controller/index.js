const { IbnuSabil, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getIbnuSabil = async (req, res) => {
  try {
    const ibnuSabil = await IbnuSabil.findAll();
    res.status(200).json(ibnuSabil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createIbnuSabil = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const dataMasyarakat = req.session?.data;
  await Masyarakat.create(dataMasyarakat);
  await IbnuSabil.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateIbnuSabil = async (req, res) => {
  const data = req.body;
  let ibnuSabil = await IbnuSabil.findOne({ where: { NIK: req.body.NIK } });
  ibnuSabil.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "20_tambahIbnuSabil",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const ibnuSabil = await IbnuSabil.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "20_editIbnuSabil",
    dataLayout(req, {
      ibnuSabil,
    })
  );
};

module.exports = {
  getIbnuSabil,
  formCreate,
  formUpdate,
  createIbnuSabil,
  updateIbnuSabil,
};
