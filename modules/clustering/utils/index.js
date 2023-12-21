const { sequelize, Op } = require("sequelize");
const { Masyarakat } = require("../../../models");

const sortingPenerima = async (result) => {
	let ranking = [];
	let masyarakat = await Masyarakat.findAll({
		where: {
			NIK: {
				[Op.in]: result.flat(),
			},
		},
	});

	for (let i = 0; i < result.length; i++) {
		masyarakat.forEach((people) => {
			if (result[i] == people.NIK) {
				ranking[i] = people;
			}
		});
	}
	// console.log(ranking);
	return ranking;
};

module.exports = { sortingPenerima };
