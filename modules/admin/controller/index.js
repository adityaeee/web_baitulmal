const { Admin } = require("../../../models");

const Validator = require("fastest-validator");
const v = new Validator();

const getAdmin = async (req, res) => {
	try {
		const admin = await Admin.findAll();
		res.status(200).json(admin);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createAdmin = async (req, res) => {
	const schema = {
		NIK: "number",
		nama: { type: "string", min: 3, max: 50 },
		email: { type: "email", label: "Email Address" },
		username: { type: "string", min: 3, max: 50 },
		password: { type: "string", min: 2, max: 50 },
	};

	const validate = v.validate(req.body, schema);

	if (validate.length) {
		return res.status(404).json(validate);
	}

	try {
		const crateAdmin = await Admin.create(req.body);
		res.status(201).json(crateAdmin);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = { getAdmin, createAdmin };
