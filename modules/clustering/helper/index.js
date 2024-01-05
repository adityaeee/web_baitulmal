const { sequelize, Op } = require("sequelize");
const { default: axios } = require("axios");
const { dataLayout } = require("../../../utils");
const { sortingPenerima } = require("../utils");
const {
	Masyarakat,
	Fakir,
	Miskin,
	MiskinInsidentil,
	AnakYatim,
	Disabilitas,
	Gharimin,
	GuruDayah,
	IbnuSabil,
	Madrasah,
	Muallaf,
	PelajarMiskin,
	PelajarRantau,
	SantriBerprestasi,
	SantriDayah,
	SantriDayahLuar,
	SantriMuallaf,
	Waqaf,
	Gampong,
} = require("../../../models");

const clusterFakir = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "fakir" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat fakir telat merata keseluruh penerima");
			res.redirect("/fakir");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Fakir.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"beban_tanggungan",
				"bobot_domisili",
				"bobot_golongan",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		let result = response.data.res;

		let ranking = await sortingPenerima(result);

		let gampong = await Gampong.findAll();

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "fakir",
				gampong,
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterMiskin = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "miskin" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat miskin telat merata keseluruh penerima");
			res.redirect("/miskin");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Miskin.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"beban_tanggungan",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "miskin",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterMiskinInsidentil = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "miskin insidentil" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat miskin insidentil telat merata keseluruh penerima");
			res.redirect("/miskin-insidentil");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await MiskinInsidentil.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"beban_tanggungan",
				"status_insiden",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "miskin-insidentil",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterGuruDayah = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "guru dayah" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat guru dayah telat merata keseluruh penerima");
			res.redirect("/guru-dayah");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await GuruDayah.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pendapatan",
				"aset",
				"beban_tanggungan",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_jadwal",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "guru-dayah",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterSantriDayah = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "santri dayah" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat santri dayah telat merata keseluruh penerima");
			res.redirect("/santri-dayah");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await SantriDayah.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"masa_belajar",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "santri-dayah",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterAnakYatim = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "anak yatim" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat anak yatim telat merata keseluruh penerima");
			res.redirect("/anak-yatim");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await AnakYatim.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "anak-yatim",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterDisabilitas = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "disabilitas" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat disabilitas telat merata keseluruh penerima");
			res.redirect("/disabilitas");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Disabilitas.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"golongan_disabilitas",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "disabilitas",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterSantriDayahLuar = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "santri dayah luar" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat santri dayah luar telat merata keseluruh penerima");
			res.redirect("/santri-dayah-luar");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await SantriDayahLuar.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"masa_belajar",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "santri-dayah-luar",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterPelajarMiskin = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "pelajar miskin" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat pelajar miskin telat merata keseluruh penerima");
			res.redirect("/pelajar-miskin");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await PelajarMiskin.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"jenjang_sekolah",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "pelajar-miskin",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterMuallaf = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "muallaf" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat muallaf telat merata keseluruh penerima");
			res.redirect("/muallaf");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Muallaf.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"umur_muallaf",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "muallaf",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterSantriMuallaf = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "santri muallaf" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat santri muallaf telat merata keseluruh penerima");
			res.redirect("/santri-muallaf");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await SantriMuallaf.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"umur_muallaf",
				"bobot_domisili",
				"bobot_golongan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "santri-muallaf",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterGharimin = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "gharimin" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat gharimin telat merata keseluruh penerima");
			res.redirect("/gharimin");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Gharimin.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"aset",
				"jumlah_hutang",
				"bobot_kuitansi",
				"bobot_permohonan",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "gharimin",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterSantriBerprestasi = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "santri berprestasi" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat santri berprestasi telat merata keseluruh penerima");
			res.redirect("/santri-berprestasi");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await SantriBerprestasi.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"masa_belajar",
				"bobot_domisili",
				"bobot_keterangan",
				"bobot_keterangan2",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "santri-berprestasi",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterMadrasah = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "madrasah" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat madrasah telat merata keseluruh penerima");
			res.redirect("/madrasah");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Madrasah.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"bobot_surat",
				"bobot_izin",
				"bobot_SK",
				"bobot_data",
				"bobot_PBM",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "madrasah",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterWaqaf = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "waqaf" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat waqaf telat merata keseluruh penerima");
			res.redirect("/waqaf");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await Waqaf.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: ["NIK", "bobot_proposal", "bobot_AIW"],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "waqaf",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterPelajarRantau = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "pelajar rantau" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat pelajar rantau telat merata keseluruh penerima");
			res.redirect("/pelajar-rantau");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await PelajarRantau.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: [
				"NIK",
				"pekerjaan",
				"pendapatan",
				"masa_belajar",
				"bobot_ijazah",
				"bobot_paspor",
				"bobot_keterangan",
				"bobot_rekening",
			],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "pelajar-rantau",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const clusterIbnuSabil = async (req, res) => {
	try {
		let masyarakat = await Masyarakat.findAll({
			where: { status: "Menunggu", golongan: "ibnu sabil" },
			attributes: ["NIK"],
		});

		if (masyarakat.length == 0) {
			req.flash("msg", "Pembagian zakat ibnu sabil telat merata keseluruh penerima");
			res.redirect("/ibnu-sabil");
			return;
		}

		const statusTrue = masyarakat.map((user) => Object.values(user.get({ plain: true })));

		let golongan = await IbnuSabil.findAll({
			where: {
				NIK: {
					[Op.in]: statusTrue.flat(),
				},
			},
			attributes: ["NIK", "bobot_surat", "bobot_identitas"],
		});

		const data = golongan.map((user) => Object.values(user.get({ plain: true })));
		// console.log(data);
		let result;
		const response = await axios.post("http://127.0.0.1:5000/clusterDataGolongan", data);

		result = response.data.res;

		let ranking = await sortingPenerima(result);

		res.render(
			"2_resultGolongan",
			dataLayout(req, {
				masyarakat: ranking,
				endpoint: "ibnu-sabil",
			})
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	clusterFakir,
	clusterMiskin,
	clusterMiskinInsidentil,
	clusterGuruDayah,
	clusterSantriDayah,
	clusterAnakYatim,
	clusterDisabilitas,
	clusterSantriDayahLuar,
	clusterPelajarMiskin,
	clusterMuallaf,
	clusterSantriMuallaf,
	clusterGharimin,
	clusterSantriBerprestasi,
	clusterMadrasah,
	clusterWaqaf,
	clusterPelajarRantau,
	clusterIbnuSabil,
};
