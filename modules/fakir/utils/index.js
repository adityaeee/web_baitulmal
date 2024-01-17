const { Fakir } = require("../../../models");

const filteringDataUpdate = async (data, id) => {
	const fakir = await Fakir.findByPk(id);
	if (data.pendapatan === "Pilih Pendapatan") {
		data.pendapatan = fakir.pendapatan;
	}
	if (data.pekerjaan === "Pilih Pekerjaan") {
		data.pekerjaan = fakir.pekerjaan;
	}
	if (data.beban_tanggungan === "Pilih Beban Tanggungan") {
		data.beban_tanggungan = fakir.beban_tanggungan;
	}
	return data;
};

module.exports = { filteringDataUpdate };
