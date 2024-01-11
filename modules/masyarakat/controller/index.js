const { Masyarakat, Gampong } = require("../../../models");
const { findGolongan } = require("../utils/index");

const { dataLayout } = require("../../../utils/index");

const getMasyarakat = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll();
		const user = req.session?.user;
		if (user?.role == "gampong") {
			masyarakat = await Masyarakat.findAll({
				where: { kode_gampong: user.kode_gampong },
			});
		}

		let data = await Masyarakat.findAll();

		res.render(
			"1_daftarPenerima",
			dataLayout(req, {
				masyarakat,
				data,
			})
		);
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
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"1_detailPenerima",
			dataLayout(req, {
				masyarakat,
				gampong,
				endpoint,
			})
		);

		if (!masyarakat) {
			return res.status(404).json({ message: "not found" });
		}
		res.status(200);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createMasyarakat = async (req, res) => {
	// console.log(req.errorValidation?.errors);
	if (req.errorValidation) {
		res.render(
			"1_tambahPenerima",
			dataLayout(req, {
				errors: req.errorValidation.errors,
			})
		);
		return;
	}
	// console.log(req.body);
	const kodeGampong = req.session.user?.kode_gampong;
	let data = { ...req.body, kode_gampong: kodeGampong };

	req.session.data = data;
	let golongan = req.body.golongan;
	const endpoint = golongan.replace(/\s/g, "-");
	res.redirect(`/${endpoint}/tambah?NIK=${req.body.NIK}`);
};

const updateMasyarakatById = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findByPk(req.params.NIK);
		// console.log(masyarakat);
		if (req.errorValidation) {
			res.render(
				"1_editPenerima",
				dataLayout(req, {
					errors: req.errorValidation.errors,
				})
			);
			return;
		}
		const data = req.body;
		// console.log(data);
		await masyarakat.update(data);
		res.redirect("/masyarakat");
		// res.status(200).json({ message: `the data has been updated`, masyarakat });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteMasyarakatById = async (req, res) => {
	const masyarakat = await Masyarakat.findByPk(req.params.NIK);
	// console.log(masyarakat);
	await findGolongan(masyarakat.golongan, masyarakat.NIK);

	try {
		await masyarakat.destroy();
		res.status(200);
		res.redirect("/masyarakat");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const formCreate = async (req, res) => {
	res.render(
		"1_tambahPenerima",
		dataLayout(req, {
			data: req?.session?.data,
		})
	);
};

const formUpdate = async (req, res) => {
	masyarakat = await Masyarakat.findByPk(req.params.NIK);
	res.render(
		"1_editPenerima",
		dataLayout(req, {
			masyarakat,
		})
	);
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
