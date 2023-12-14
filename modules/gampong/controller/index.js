const { Gampong } = require("../../../models");

const { dataLayout } = require("../../../utils/index");

const getGampong = async (req, res) => {
  try {
    const gampongs = await Gampong.findAll();
    res.render(
      "3_daftarGampong",
      dataLayout(req, {
        gampongs,
      })
    );
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGampongById = async (req, res) => {
  try {
    const gampong = await Gampong.findByPk(req.params.kode_gampong);
    res.render(
      "3_detailGampong",
      dataLayout(req, {
        gampong,
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGampongById = async (req, res) => {
  try {
    let gampong = await Gampong.findByPk(req.params.id);
    if (req.errorValidation) {
      res.render(
        "3_editGampong",
        dataLayout(req, {
          errors: req.errorValidation.errors,
        })
      );
      return;
    }
    // res.json(req.body);
    const data = req.body;
    await gampong.update(data);
    req.flash("msg", `Data Gampong Berhasil di ubah`);
    res.redirect("/masyarakat");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const formUpdate = async (req, res) => {
  const gampong = await Gampong.findByPk(req.params.kode_gampong);
  res.render(
    "3_editGampong",
    dataLayout(req, {
      gampong,
    })
  );
};

module.exports = { getGampong, getGampongById, formUpdate, updateGampongById };
