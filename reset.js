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

// const angka = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const something = angka.some([2, 11]);

// console.log(something); // Output: true
