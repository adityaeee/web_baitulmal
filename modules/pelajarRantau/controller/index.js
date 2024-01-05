const { PelajarRantau, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getPelajarRantau = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "pelajar rantau" },
		});
		res.render(
			"19_daftarPelajarRantau",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPelajarRantauById = async (req, res) => {
	try {
		const golongan = await PelajarRantau.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"19_detailPelajarRantau",
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

const createPelajarRantau = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await PelajarRantau.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updatePelajarRantau = async (req, res) => {
	const data = req.body;
	let pelajarRantau = await PelajarRantau.findByPk(req.params.id);
	pelajarRantau.update(data);
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

	const perubahan = {
		status: "Sudah",
		periode: "Pertama",
	};

	if (typeof data == "string") {
		penerima = await Masyarakat.findOne({ where: { NIK: data } });
		penerima.update(perubahan);
	} else {
		for (let i = 0; i < limit; i++) {
			penerima = await Masyarakat.findOne({ where: { NIK: data[i] } });
			penerima.update(perubahan);
		}
	}

	req.flash("msg", `Data pelajar rantau penerima zakat berhasil diupdate`);
	res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
	res.render(
		"19_tambahPelajarRantau",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const pelajarRantau = await PelajarRantau.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"19_editPelajarRantau",
		dataLayout(req, {
			pelajarRantau,
		})
	);
};

module.exports = {
	getPelajarRantau,
	getPelajarRantauById,
	formCreate,
	formUpdate,
	createPelajarRantau,
	updatePelajarRantau,
	updateAll,
};
