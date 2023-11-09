const { object, string, number, date, InferType } = require("yup");

let registerSchema = object({
  nama: string().required(),
  NIK: number().required(),
});

let loginSchemaGampong = object({
  kode_gampong: number().required(),
});

module.exports = { registerSchema, loginSchemaGampong };
