const {
  Fakir,
  Miskin,
  MiskinInsidentil,
  SantriDayah,
  GuruDayah,
  SantriDayahLuar,
  AnakYatim,
  Disabilitas,
  PelajarMiskin,
  Muallaf,
  SantriMuallaf,
  Gharimin,
  SantriBerprestasi,
  Madrasah,
  Waqaf,
  PelajarRantau,
  IbnuSabil,
} = require("../../../models");

const findGolongan = async (golongan, NIK) => {
  if (golongan == "fakir") {
    const people = await Fakir.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "miskin") {
    const people = await Miskin.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "miskin insidentil") {
    const people = await MiskinInsidentil.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "santri dayah") {
    const people = await SantriDayah.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "guru dayah") {
    const people = await GuruDayah.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "santri dayah luar") {
    const people = await SantriDayahLuar.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "anak yatim") {
    const people = await AnakYatim.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "disabilitas") {
    const people = await Disabilitas.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "pelajar miskin") {
    const people = await PelajarMiskin.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "muallaf") {
    const people = await Muallaf.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "santri muallaf") {
    const people = await SantriMuallaf.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "gharimin") {
    const people = await Gharimin.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "santri berprestasi") {
    const people = await SantriBerprestasi.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "madrasah") {
    const people = await Madrasah.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "waqaf") {
    const people = await Waqaf.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "pelajar rantau") {
    const people = await PelajarRantau.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  } else if (golongan == "ibnu sabil") {
    const people = await IbnuSabil.findOne({ where: { NIK: NIK } });
    await people?.destroy();
  }
};

module.exports = {
  findGolongan,
};
