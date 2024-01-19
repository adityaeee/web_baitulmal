const { Miskin, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMiskin = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "miskin" },
		});
		res.render(
			"5_daftarMiskin",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getMiskinById = async (req, res) => {
	try {
		const golongan = await Miskin.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"5_detailMiskin",
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

const createMiskin = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await Miskin.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateMiskin = async (req, res) => {
	const data = req.body;
	let miskin = await Miskin.findByPk(req.params.id);
	miskin.update(data);
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

	req.flash("msg", `Data penerima zakat miskin berhasil diupdate`);
	res.redirect("/miskin");
};

const formCreate = async (req, res) => {
	res.render(
		"5_tambahMiskin",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const miskin = await Miskin.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"5_editMiskin",
		dataLayout(req, {
			miskin,
		})
	);
};

module.exports = {
	getMiskin,
	getMiskinById,
	formCreate,
	formUpdate,
	createMiskin,
	updateMiskin,
	updateAll,
};
