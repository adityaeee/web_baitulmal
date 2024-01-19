const { MiskinInsidentil, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMiskinInsidentil = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "miskin insidentil" },
		});
		res.render(
			"6_daftarMiskinInsidentil",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getMiskinInsidentilById = async (req, res) => {
	try {
		const golongan = await MiskinInsidentil.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"6_detailMiskinInsidentil",
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

const createMiskinInsidentil = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await MiskinInsidentil.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateMiskinInsidentil = async (req, res) => {
	const data = req.body;
	let miskinInsidentil = await MiskinInsidentil.findByPk(req.params.id);
	miskinInsidentil.update(data);
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

	req.flash("msg", `Data penerima zakat miskin insidentil berhasil diupdate`);
	res.redirect("/miskin-insidentil");
};

const formCreate = async (req, res) => {
	res.render(
		"6_tambahMiskinInsidentil",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const miskinInsidentil = await MiskinInsidentil.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"6_editMiskinInsidentil",
		dataLayout(req, {
			miskinInsidentil,
		})
	);
};

module.exports = {
	getMiskinInsidentil,
	getMiskinInsidentilById,
	formCreate,
	formUpdate,
	createMiskinInsidentil,
	updateMiskinInsidentil,
	updateAll,
};
