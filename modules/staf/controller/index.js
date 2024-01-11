const { Staf } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getStaf = async (req, res) => {
	try {
		let staf = await Staf.findAll();
		// res.render(
		// 	"2_daftarStaf",
		// 	dataLayout(req, {
		// 		staf,
		// 	})
		// );
		res.status(200).json(staf);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getStafById = async (req, res) => {
	try {
		console.log(req.params.NIK);
		const staf = await Staf.findByPk(req.params.NIK);

		res.render(
			"2_detailStaf",
			dataLayout(req, {
				staf,
			})
		);

		if (!staf) {
			return res.status(404);
		}
		res.status(200);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createStaf = async (req, res) => {
	const data = req.body;
	await Staf.create(data);
	req.flash("msg", `Data staf berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateStaf = async (req, res) => {
	const data = req.body;
	let staf = await Staf.findByPk(req.params.NIK);
	staf.update(data);
	req.flash("msg", `Data staf berhasil diupdate`);
	res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
	res.render("2_tambahStaf", dataLayout(req, {}));
	res.status(200);
};

const formUpdate = async (req, res) => {
	const staf = await Staf.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"2_editStaf",
		dataLayout(req, {
			staf,
		})
	);
};

module.exports = {
	getStaf,
	getStafById,
	createStaf,
	updateStaf,
	formCreate,
	formUpdate,
};
