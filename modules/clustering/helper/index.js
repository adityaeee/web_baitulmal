const { sequelize, Op } = require("sequelize");
const { Masyarakat, Fakir } = require("../../../models");
const { default: axios } = require("axios");
const { dataLayout } = require("../../../utils");

const clusterFakir = async (req, res) => {
  try {
    let masyarakat = await Masyarakat.findAll({
      where: { status: "Menunggu", golongan: "fakir" },
      attributes: ["NIK"],
    });

    const statusTrue = masyarakat.map((user) =>
      Object.values(user.get({ plain: true }))
    );

    let golongan = await Fakir.findAll({
      where: {
        NIK: {
          [Op.in]: statusTrue.flat(),
        },
      },
      attributes: [
        "NIK",
        "pekerjaan",
        "pendapatan",
        "umur",
        "beban_tanggungan",
        "bobot_domisili",
        "bobot_golongan",
      ],
    });

    const data = golongan.map((user) =>
      Object.values(user.get({ plain: true }))
    );
    let result;
    const response = await axios.post(
      "http://127.0.0.1:5000/clusterDataGolongan",
      data
    );

    result = response.data.res;

    masyarakat = await Masyarakat.findAll({
      where: {
        NIK: {
          [Op.in]: result.flat(),
        },
      },
    });

    // console.log(masyarakat);

    res.render(
      "3_resultGolongan",
      dataLayout(req, {
        masyarakat,
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { clusterFakir };
