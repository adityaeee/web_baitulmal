const { sequelize, Op } = require("sequelize");
const { Masyarakat, Fakir } = require("../../../models");
const { default: axios } = require("axios");

// let data = [
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
// ];

const clusterFakir = async (req, res) => {
  try {
    const masyarakat = await Masyarakat.findAll({
      where: { status: "belum diproses", golongan: "fakir" },
      attributes: ["NIK"],
    });

    const statusTrue = masyarakat.map((user) =>
      Object.values(user.get({ plain: true }))
    );

    const golongan = await Fakir.findAll({
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
    // console.log(data);

    const cluster = await axios.post(
      "http://127.0.0.1:5000/clusterDataGolongan",
      data
    );

    console.log(cluster);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { clusterFakir };
