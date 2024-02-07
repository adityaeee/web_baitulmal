const { Staf } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getStaf = async (req, res) => {
	try {
		let stafs = await Staf.findAll();
		res.render(
			"2_daftarStaf",
			dataLayout(req, {
				stafs,
			})
		);
		res.status(200);
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
		res.status(200);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createStaf = async (req, res) => {
	const data = req.body;

	let cekNIK = await Staf.findByPk(req.body.NIK);
	console.log(cekNIK?.NIK);
	if (req.body.NIK == cekNIK?.NIK) {
		console.log(cekNIK.nama);
		res.render(
			"2_tambahStaf",
			dataLayout(req, {
				errors: ["Nomor KTP telah terdaftar "],
				data: req?.session?.data,
			})
		);
		return;
	}

	await Staf.create(data);
	req.flash("msg", `Data staf berhasil ditambahkan`);
	res.redirect("/staf");
};

const deleteStafById = async (req, res) => {
	const staf = await Staf.findByPk(req.params.NIK);

	try {
		await staf.destroy();
		res.status(200);
		res.redirect("/staf");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
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
	deleteStafById,
};
