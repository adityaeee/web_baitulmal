const { Fakir, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getFakir = async (req, res) => {
  try {
    const masyarakat = await Masyarakat.findAll({
      where: { golongan: "fakir" },
    });
    res.render(
      "4_daftarFakir",
      dataLayout(req, {
        masyarakat,
      })
    );
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFakirById = async (req, res) => {
  try {
    const golongan = await Fakir.findOne({
      where: {
        NIK: req.params.NIK,
      },
    });
    const masyarakat = await Masyarakat.findByPk(req.params.NIK);
    const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
    const endpoint = masyarakat.golongan.replace(/\s/g, "-");

    res.render(
      "4_detailFakir",
      dataLayout(req, {
        masyarakat,
        golongan,
        gampong,
        endpoint,
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakir = async (req, res) => {
  const data = req.body;
  const dataMasyarakat = req.session?.data;
  console.log(dataMasyarakat);
  await Masyarakat.create(dataMasyarakat);
  await Fakir.create(data);
  req.session.data = "";
  req.flash("msg", `Data berhasil ditambahkan`);
  res.redirect("/masyarakat");
};

const updateFakir = async (req, res) => {
  const data = req.body;
  let fakir = await Fakir.findByPk(req.params.id);
  fakir.update(data);
  req.flash("msg", `Data berhasil diupdate`);
  res.redirect("/masyarakat");
};

const updateAll = async (req, res) => {
  let data = req.body.NIK;
  let limit = req.body.limit;
  let penerima = 0;
  if (limit > data.length) {
    limit = data.length;
  }

  const perubahan = {
    status: "Sudah",
    periode: "Pertama",
  };

  for (let i = 0; i < limit; i++) {
    penerima = await Masyarakat.findOne({ where: { NIK: data[i] } });
    console.log(penerima);
    penerima.update(perubahan);
  }

  req.flash("msg", `Data penerima zakat fakir berhasil diupdate`);
  res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
  res.render(
    "4_tambahFakir",
    dataLayout(req, {
      NIK: req.query.NIK,
      data: req.session?.data,
    })
  );
  res.status(200);
};

const formUpdate = async (req, res) => {
  const fakir = await Fakir.findOne({
    where: {
      NIK: req.params.NIK,
    },
  });
  res.render(
    "4_editFakir",
    dataLayout(req, {
      fakir,
    })
  );
};

module.exports = {
  getFakir,
  getFakirById,
  formCreate,
  formUpdate,
  createFakir,
  updateFakir,
  updateAll,
};
