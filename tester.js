// let golongan = "santri berprestasi sekali";
// const data = golongan.replace(/\s/g, "-");

// console.log(data);

const { Gampong, Masyarakat } = require("./models");

const reset = async () => {
  const masyarakat = await Masyarakat.findAll();

  const perubahan = {
    status: "Menunggu",
    periode: "Menunggu",
  };

  masyarakat.forEach((org) => {
    org.update(perubahan);
  });
};
reset();
