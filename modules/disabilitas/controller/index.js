const { Disabilitas, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getDisabilitas = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "disabilitas" },
		});
		res.render(
			"11_daftarDisabilitas",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getDisabilitasById = async (req, res) => {
	try {
		const golongan = await Disabilitas.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"11_detailDisabilitas",
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

const createDisabilitas = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await Disabilitas.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateDisabilitas = async (req, res) => {
	const data = req.body;
	let disabilitas = await Disabilitas.findByPk(req.params.id);
	disabilitas.update(data);
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

	req.flash("msg", `Data disabilitas penerima zakat berhasil diupdate`);
	res.redirect("/disabilitas");
};

const formCreate = async (req, res) => {
	res.render(
		"11_tambahDisabilitas",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const disabilitas = await Disabilitas.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"11_editDisabilitas",
		dataLayout(req, {
			disabilitas,
		})
	);
};

module.exports = {
	getDisabilitas,
	getDisabilitasById,
	formCreate,
	formUpdate,
	createDisabilitas,
	updateDisabilitas,
	updateAll,
};
