const { object, string, number, date, InferType } = require("yup");

let registerSchema = object({
  NIK: number().max(16, "NIK harus 16 karakter"),
  kode_gampong: number().min(8, "kode gampong harus 8 karakter").required(),
});

let loginSchemaGampong = object({
  kode_gampong: number().required(),
});

let loginSchemaAdmin = object({
  username: string().required(),
});

let loginSchemaStaf = object({
  username: string().required(),
});

module.exports = {
  registerSchema,
  loginSchemaGampong,
  loginSchemaAdmin,
  loginSchemaStaf,
};
