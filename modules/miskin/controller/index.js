const { Miskin, Masyarakat } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const getMiskin = async (req, res) => {
	try {
		const miskin = await Miskin.findAll();
		res.status(200).json(miskin);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createMiskin = async (req, res) => {
	const data = req.body;
	const dataMasyarakat = req.session?.data;
	await Masyarakat.create(dataMasyarakat);
	await Miskin.create(data);
	req.session.data = "";
	req.flash("msg", `Data berhasil ditambahkan`);
	res.redirect("/masyarakat");
};

const updateMiskin = async (req, res) => {
	const data = req.body;
	let miskin = await Miskin.findOne({ where: { NIK: req.body.NIK } });
	miskin.update(data);
	req.flash("msg", `Data berhasil diupdate`);
	res.redirect("/masyarakat");
};

const formCreate = async (req, res) => {
	res.render(
		"5_tambahMiskin",
		dataLayout(req, {
			NIK: req.query.NIK,
			data: req.session?.data,
		})
	);
	res.status(200);
};

const formUpdate = async (req, res) => {
	const miskin = await Miskin.findOne({
		where: {
			NIK: req.params.NIK,
		},
	});
	res.render(
		"5_editMiskin",
		dataLayout(req, {
			miskin,
		})
	);
};

module.exports = {
	getMiskin,
	formCreate,
	formUpdate,
	createMiskin,
	updateMiskin,
};
