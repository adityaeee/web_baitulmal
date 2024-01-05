const { IbnuSabil, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getIbnuSabil = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "ibnu sabil" },
		});
		res.render(
			"20_daftarIbnuSabil",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getIbnuSabilById = async (req, res) => {
	try {
		const golongan = await IbnuSabil.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"20_detailIbnuSabil",
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

const createIbnuSabil = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await IbnuSabil.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateIbnuSabil = async (req, res) => {
	const data = req.body;
	let ibnuSabil = await IbnuSabil.findByPk(req.params.id);
	ibnuSabil.update(data);
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

	req.flash("msg", `Data ibnu sabil penerima zakat berhasil diupdate`);
	res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
	res.render(
		"20_tambahIbnuSabil",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const ibnuSabil = await IbnuSabil.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"20_editIbnuSabil",
		dataLayout(req, {
			ibnuSabil,
		})
	);
};

module.exports = {
	getIbnuSabil,
	getIbnuSabilById,
	formCreate,
	formUpdate,
	createIbnuSabil,
	updateIbnuSabil,
	updateAll,
};
