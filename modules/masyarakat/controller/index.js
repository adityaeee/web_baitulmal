const { parse } = require("dotenv");
const { Masyarakat } = require("../../../models");
const { validasiCreateData, validasiUpdateData } = require("../utils/index");

const Validator = require("fastest-validator");
const v = new Validator();

const getMasyarakat = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findAll();
		res.status(200).json(masyarakat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getMasyarakatById = async (req, res) => {
	try {
		const masyarakat = await Masyarakat.findOne({ where: { NIK: req.params.NIK}});
		console.log(masyarakat)
		if (!masyarakat) {
			return res.status(404).json({ message: "not found" });
		}
		res.status(200).json(masyarakat);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createMasyarakat = async (req, res) => {
	const validate = validasiCreateData(req.body);

	if (validate.length) {
		return res.status(404).json(validate);
	}

	try {
		const createMasyarakat = await Masyarakat.create(req.body);
		res.status(201).json(createMasyarakat);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateMasyarakatById = async (req, res) => {
	const masyarakat = await Masyarakat.findByPk(req.params.NIK);

	if (!masyarakat) {
		return res.status(404).json({ message: `not found` });
	}

	const validate = validasiUpdateData(req.body);

	if (validate.length) {
		return res.status(404).json(validate);
	}

	try {
		await masyarakat.update(req.body);
		res.status(200).json({ message: `the data has been updated`, masyarakat });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteMasyarakatById = async (req, res) => {
	const masyarakat = await Masyarakat.findByPk(req.params.NIK);

	if (!masyarakat) {
		return res.status(404).json({ message: "not found" });
	}

	try {
		await masyarakat.destroy();
		res.status(200).json({ message: "the data has been deleted" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getMasyarakat,
	createMasyarakat,
	getMasyarakatById,
	updateMasyarakatById,
	deleteMasyarakatById,
};
