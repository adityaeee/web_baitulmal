const Validator = require("fastest-validator");
const v = new Validator();

const validasiCreateData = (data) => {
	const schema = {
		no_KK: "number",
		NIK: "number",
		nama: { type: "string", min: 2, max: 50 },
	};

	const validate = v.validate(data, schema);
	return validate;
};

const validasiUpdateData = (data) => {
	const schema = {
		no_KK: "number|optional",
		NIK: "number|optional",
		nama: { type: "string", min: 2, max: 50, optional: true },
	};

	const validate = v.validate(data, schema);
	return validate;
};

module.exports = { validasiCreateData, validasiUpdateData };
