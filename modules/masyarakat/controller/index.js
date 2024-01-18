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
	req.session.data = req.body;

	if (req.errorValidation) {
		res.render(
			"1_tambahPenerima",
			dataLayout(req, {
				errors: req.errorValidation.errors,
				data: req?.session?.data,
			})
		);
		return;
	}

	let cekNIK = await Masyarakat.findByPk(req.body.NIK);
	console.log(cekNIK?.NIK);
	if (req.body.NIK == cekNIK?.NIK) {
		console.log(cekNIK.nama);
		res.render(
			"1_tambahPenerima",
			dataLayout(req, {
				errors: ["Nomor KTP telah terdaftar "],
				data: req?.session?.data,
			})
		);
		return;
	}

	// console.log(req.body);
	const kodeGampong = req.session.user?.kode_gampong;
	let data = { ...req.body, kode_gampong: kodeGampong };

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

const reset = async (req, res) => {
	let masyarakat = await Masyarakat.findByPk(req.params.NIK);
	// console.log(masyarakat);

	let perubahan = {
		status: "Menunggu",
	};

	masyarakat.update(perubahan);

	let endpoint = req.body.golongan.replace(/\s/g, "-");
	res.redirect(`/${endpoint}`);
};

const resetAll = async (req, res) => {
	let masyarakat = await Masyarakat.findAll({
		where: { golongan: req.body.golongan },
	});

	let perubahan = {
		status: "Menunggu",
	};

	masyarakat.forEach((m) => {
		m.update(perubahan);
	});

	let endpoint = req.body.golongan.replace(/\s/g, "-");
	res.redirect(`/${endpoint}`);
};

module.exports = {
	getMasyarakat,
	createMasyarakat,
	getMasyarakatById,
	updateMasyarakatById,
	deleteMasyarakatById,
	formCreate,
	formUpdate,
	reset,
	resetAll,
};
