const { AnakYatim, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getAnakYatim = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "anak yatim" },
		});
		res.render(
			"10_daftarAnakYatim",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAnakYatimById = async (req, res) => {
	try {
		const golongan = await AnakYatim.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"10_detailAnakYatim",
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

const createAnakYatim = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await AnakYatim.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateAnakYatim = async (req, res) => {
	const data = req.body;
	let anakYatim = await AnakYatim.findByPk(req.params.id);
	anakYatim.update(data);
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

	req.flash("msg", `Data anak yatim penerima zakat berhasil diupdate`);
	res.redirect("/anak-yatim");
};

const formCreate = async (req, res) => {
	res.render(
		"10_tambahAnakYatim",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const anakYatim = await AnakYatim.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"10_editAnakYatim",
		dataLayout(req, {
			anakYatim,
		})
	);
};

module.exports = {
	getAnakYatim,
	getAnakYatimById,
	formCreate,
	formUpdate,
	createAnakYatim,
	updateAnakYatim,
	updateAll,
};
