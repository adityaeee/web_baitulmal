const { Masyarakat } = require("../../../models");
const { object, string, number, date, InferType } = require("yup");

let addSchema = object({
  nama: string().required(),
});

module.exports = { addSchema };
