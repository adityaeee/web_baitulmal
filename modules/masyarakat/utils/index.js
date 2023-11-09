const { Masyarakat, Fakir } = require("../../../models");

const findGolongan = async (golongan, NIK) => {
  console.log(golongan);
  console.log(NIK);
  if (golongan == "fakir") {
    const people = await Fakir.findOne({ where: { NIK: NIK } });
    await people.destroy();
  }
};

module.exports = {
  findGolongan,
};
