const { Waqaf, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getWaqaf = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "waqaf" },
		});
		res.render(
			"18_daftarWaqaf",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getWaqafById = async (req, res) => {
	try {
		const golongan = await Waqaf.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"18_detailWaqaf",
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

const createWaqaf = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await Waqaf.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateWaqaf = async (req, res) => {
	const data = req.body;
	let waqaf = await Waqaf.findByPk(req.params.id);
	waqaf.update(data);
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

	if (typeof data == "string") {
		penerima = await Masyarakat.findOne({ where: { NIK: data } });
		let perubahan = {
			status: "Sudah",
			periode: Number(penerima.periode) + 1,
			waktu_proses: new Date(),
		};
		penerima.update(perubahan);
	} else {
		for (let i = 0; i < limit; i++) {
			penerima = await Masyarakat.findOne({ where: { NIK: data[i] } });
			let perubahan = {
				status: "Sudah",
				periode: Number(penerima.periode) + 1,
				waktu_proses: new Date(),
			};
			penerima.update(perubahan);
		}
	}

	req.flash("msg", `Data bantuan zaqat harta waqaf  berhasil diupdate`);
	res.redirect("/waqaf");
};

const formCreate = async (req, res) => {
	res.render(
		"18_tambahWaqaf",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const waqaf = await Waqaf.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"18_editWaqaf",
		dataLayout(req, {
			waqaf,
		})
	);
};

module.exports = {
	getWaqaf,
	getWaqafById,
	formCreate,
	formUpdate,
	createWaqaf,
	updateWaqaf,
	updateAll,
};
