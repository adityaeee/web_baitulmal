const { MiskinInsidentil, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMiskinInsidentil = async (req, res) => {
	try {
		const miskinInsidentil = await MiskinInsidentil.findAll();
		res.status(200).json(miskinInsidentil);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createMiskinInsidentil = async (req, res) => {
	const data = req.body;
	// console.log(data);
	const dataMasyarakat = req.session?.data;
	await Masyarakat.create(dataMasyarakat);
	await MiskinInsidentil.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateMiskinInsidentil = async (req, res) => {
	const data = req.body;
	let miskinInsidentil = await MiskinInsidentil.findOne({ where: { NIK: req.body.NIK } });
	miskinInsidentil.update(data);
	req.flash("msg", `Data berhasil diupdate`);
	res.redirect("/masyarakat");
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
	formCreate,
	formUpdate,
	createMiskinInsidentil,
	updateMiskinInsidentil,
};
