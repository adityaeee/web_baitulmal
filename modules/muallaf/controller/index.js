const { Muallaf, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMuallaf = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "muallaf" },
		});
		res.render(
			"12_daftarMuallaf",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getMuallafById = async (req, res) => {
	try {
		const golongan = await Muallaf.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"12_detailMuallaf",
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

const createMuallaf = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await Muallaf.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateMuallaf = async (req, res) => {
	const data = req.body;
	let muallaf = await Muallaf.findByPk(req.params.id);
	muallaf.update(data);
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

	req.flash("msg", `Data penerima zakat muallaf  berhasil diupdate`);
	res.redirect("/muallaf");
};

const formCreate = async (req, res) => {
	res.render(
		"12_tambahMuallaf",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const muallaf = await Muallaf.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"12_editMuallaf",
		dataLayout(req, {
			muallaf,
		})
	);
};

module.exports = {
	getMuallaf,
	getMuallafById,
	formCreate,
	formUpdate,
	createMuallaf,
	updateMuallaf,
	updateAll,
};
