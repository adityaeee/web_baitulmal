const { Masyarakat } = require("../models");

function golongan() {
	const golongan = [
		"fakir",
		"miskin",
		"miskin insidentil",
		"guru dayah",
		"santri dayah",
		"Santri dayah luar",
		"anak yatim",
		"disabilitas",
		"pelajar miskin",
		"santri muallaf",
		"muallaf",
		"gharimin",
		"santri berprestasi",
		"madrasah",
		"waqaf",
		"pelajar rantau",
		"ibnu sabil",
	];
	return golongan;
}

function dataLayout(req, data) {
	// console.log(req.cookies);
	return {
		layout: "layouts/main-layouts",
		title: "Zaqat",
		msg: req.flash("msg"),
		session: req.session,
		...data,
		// user: req.cookies?.user ? JSON.parse(req.cookies?.user) : {},
	};
}

const jumPenyaluran = async () => {
	let a = 0;
	let b = 0;
	let array = [];
	const masyarakat = await Masyarakat.findAll();
	masyarakat.forEach((m) => {
		if (m.status == "Sudah") {
			a++;
		} else {
			b++;
		}
	});

	array.push(a);
	array.push(b);
	return array;
};

async function jumGolongan() {
	const masyarakat = await Masyarakat.findAll();
	let data = golongan();
	let i = 0;
	let array = [];

	data.forEach((gol) => {
		masyarakat.forEach((m) => {
			if (gol == m.golongan) {
				i++;
			}
		});
		array.push(i);
		i = 0;
	});

	return array;
}

async function jumPembagianGol() {
	const masyarakat = await Masyarakat.findAll();
	let data = golongan();
	let i = 0;
	let array = [];

	data.forEach((gol) => {
		masyarakat.forEach((m) => {
			if (gol == m.golongan) {
				if (m.status == "Sudah") {
					i++;
				}
			}
		});
		array.push(i);
		i = 0;
	});

	return array;
}

module.exports = { dataLayout, jumPenyaluran, jumGolongan, jumPembagianGol };
