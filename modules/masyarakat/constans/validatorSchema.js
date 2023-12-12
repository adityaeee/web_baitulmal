const { object, string, number, date, InferType } = require("yup");

let addSchema = object({
  nama: string().required("nama harus string"),
  NIK: string().min(16).max(16).required("NIK harus berupa angka 16 digit"),
});

let updateSchema = object({
  nama: string(),
  // NIK: string(),
});

module.exports = { addSchema, updateSchema };
