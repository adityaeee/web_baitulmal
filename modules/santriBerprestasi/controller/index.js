const { SantriBerprestasi, Masyarakat, Gampong } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getSantriBerprestasi = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll({
			where: { golongan: "santri berprestasi" },
		});
		res.render(
			"16_daftarSantriBerprestasi",
			dataLayout(req, {
				masyarakat,
			})
		);
		res.status(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getSantriBerprestasiById = async (req, res) => {
	try {
		const golongan = await SantriBerprestasi.findOne({
			where: {
				NIK: req.params.NIK,
			},
		});
		const masyarakat = await Masyarakat.findByPk(req.params.NIK);
		const gampong = await Gampong.findByPk(masyarakat?.kode_gampong);
		const endpoint = masyarakat.golongan.replace(/\s/g, "-");

		res.render(
			"16_detailSantriBerprestasi",
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

const createSantriBerprestasi = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	// console.log(dataMasyarakat);
	await Masyarakat.create(dataMasyarakat);
	await SantriBerprestasi.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateSantriBerprestasi = async (req, res) => {
	const data = req.body;
	let santriBerprestasi = await SantriBerprestasi.findByPk(req.params.id);
	santriBerprestasi.update(data);
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

	req.flash("msg", `Data penerima zakat santri berprestasi berhasil diupdate`);
	res.redirect("/santri-berprestasi");
};

const formCreate = async (req, res) => {
	res.render(
		"16_tambahSantriBerprestasi",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const santriBerprestasi = await SantriBerprestasi.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"16_editSantriBerprestasi",
		dataLayout(req, {
			santriBerprestasi,
		})
	);
};

module.exports = {
	getSantriBerprestasi,
	getSantriBerprestasiById,
	formCreate,
	formUpdate,
	createSantriBerprestasi,
	updateSantriBerprestasi,
	updateAll,
};
