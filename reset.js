// let golongan = "santri berprestasi sekali";
// const data = golongan.replace(/\s/g, "-");

// console.log(data);

const { Gampong, Masyarakat } = require("./models");

const reset = async () => {
	const masyarakat = await Masyarakat.findAll();

	const perubahan = {
		status: "Menunggu",
		periode: 0,
	};

	masyarakat.forEach((org) => {
		org.update(perubahan);
	});
};

reset();

// const angka = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const something = angka.some([2, 11]);

// console.log(something); // Output: true

// let data = [
// 	[12, 45, 3],
// 	[5, 6, 87, 9],
// 	[0, 0, 6],
// ];

// let data2 = [
// 	{
// 		a: "adad",
// 		b: "eeeqrqw",
// 		c: "qreqr",
// 	},
// ];

// let d = JSON.stringify(data2);
// console.log(d);
