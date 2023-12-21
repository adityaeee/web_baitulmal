const { SantriBerprestasi, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getSantriBerprestasi = async (req, res) => {
	try {
		const santriBerprestasi = await SantriBerprestasi.findAll();
		res.status(200).json(santriBerprestasi);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createSantriBerprestasi = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	await Masyarakat.create(dataMasyarakat);
	await SantriBerprestasi.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateSantriBerprestasi = async (req, res) => {
	const data = req.body;
	let santriBerprestasi = await SantriBerprestasi.findOne({
		where: { NIK: req.body.NIK },
	});
	santriBerprestasi.update(data);
	req.flash("msg", `Data berhasil diupdate`);
	res.redirect("/masyarakat");
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
	formCreate,
	formUpdate,
	createSantriBerprestasi,
	updateSantriBerprestasi,
};
