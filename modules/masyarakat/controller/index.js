const { Masyarakat, Gampong } = require("../../../models");
const { findGolongan } = require("../utils/index");

const multer = require("multer");

const getMasyarakat = async (req, res) => {
  try {
    const masyarakat = await Masyarakat.findAll();
    res.render("1_daftarPenerima", {
      layout: "layouts/main-layouts",
      msg: req.flash("msg"),
      title: "Zaqat",
      masyarakat,
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMasyarakatById = async (req, res) => {
  try {
    const masyarakat = await Masyarakat.findOne({
      where: { NIK: req.params.NIK },
    });
    const gampong = await Gampong.findByPk(masyarakat.kode_gampong);

    res.render("1_detailPenerima", {
      layout: "layouts/main-layouts",
      title: "Zaqat",
      masyarakat,
      gampong,
    });

    if (!masyarakat) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMasyarakat = async (req, res) => {
  try {
    if (req.errorValidation) {
      console.log(req.errorValidation.errors);
      res.render("1_tambahPenerima", {
        layout: "layouts/main-layouts",
        msg: req.flash("msg"),
        title: "Zaqat",
        errors: req.errorValidation.errors,
      });
      return;
    }
    await Masyarakat.create(req.body);
    const golongan = req.body.golongan;
    res.redirect(`/${golongan}/tambah?NIK=${req.body.NIK}`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateMasyarakatById = async (req, res) => {
  const masyarakat = await Masyarakat.findByPk(req.params.NIK);

  if (!masyarakat) {
    return res.status(404).json({ message: `not found` });
  }

  const validate = validasiUpdateData(req.body);

  if (validate.length) {
    return res.status(404).json(validate);
  }

  try {
    await masyarakat.update(req.body);
    res.status(200).json({ message: `the data has been updated`, masyarakat });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteMasyarakatById = async (req, res) => {
  const masyarakat = await Masyarakat.findByPk(req.params.NIK);
  console.log(masyarakat);
  await findGolongan(masyarakat.golongan, masyarakat.NIK);

  try {
    await masyarakat.destroy();
    res.status(200);
    req.flash("msg", "Data berhasil dihapus");
    res.redirect("/masyarakat");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const formCreate = async (req, res) => {
  res.render("1_tambahPenerima", {
    layout: "layouts/main-layouts",
    title: "Zaqat",
  });
  res.status(200);
};

const formUpdate = async (req, res) => {
  masyarakat = await Masyarakat.findByPk(req.params.NIK);
  res.status(200).json(masyarakat);
};

module.exports = {
  getMasyarakat,
  createMasyarakat,
  getMasyarakatById,
  updateMasyarakatById,
  deleteMasyarakatById,
  formCreate,
  formUpdate,
};
