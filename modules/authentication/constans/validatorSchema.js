const { object, string, number, date, InferType } = require("yup");

let registerSchema = object({
  nama: string().required(),
  NIK: number().required(),
});

let loginSchemaGampong = object({
  kode_gampong: number().required(),
});

let loginSchemaAdmin = object({
  username: string().required(),
});

module.exports = { registerSchema, loginSchemaGampong, loginSchemaAdmin };
