const { PelajarMiskin, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getPelajarMiskin = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "pelajar miskin" },
		});
		res.render(
			"13_daftarPelajarMiskin",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPelajarMiskinById = async (req, res) => {
	try {
		const golongan = await PelajarMiskin.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"13_detailpelajarMiskin",
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

const createPelajarMiskin = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await PelajarMiskin.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updatePelajarMiskin = async (req, res) => {
	const data = req.body;
	let pelajarMiskin = await PelajarMiskin.findByPk(req.params.id);
	pelajarMiskin.update(data);
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
		};
		penerima.update(perubahan);
	} else {
		for (let i = 0; i < limit; i++) {
			penerima = await Masyarakat.findOne({ where: { NIK: data[i] } });
			let perubahan = {
				status: "Sudah",
				periode: Number(penerima.periode) + 1,
			};
			penerima.update(perubahan);
		}
	}

	req.flash("msg", `Data penerima zakat pelajar miskin  berhasil diupdate`);
	res.redirect("/pelajar-miskin");
};

const formCreate = async (req, res) => {
	res.render(
		"13_tambahPelajarMiskin",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const pelajarMiskin = await PelajarMiskin.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"13_editPelajarMiskin",
		dataLayout(req, {
			pelajarMiskin,
		})
	);
};

module.exports = {
	getPelajarMiskin,
	getPelajarMiskinById,
	formCreate,
	formUpdate,
	createPelajarMiskin,
	updatePelajarMiskin,
	updateAll,
};
