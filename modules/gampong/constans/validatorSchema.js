const { object, string, number, date, InferType } = require("yup");

let addSchema = object({
  nama: string().required("nama harus string"),
});

let updateSchema = object({
  nama: string(),
  // NIK: string(),
});

module.exports = { addSchema, updateSchema };
