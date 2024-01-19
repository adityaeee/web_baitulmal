var express = require("express");
var router = express.Router();

const { Sequelize, DataTypes } = require("sequelize");

const { Masyarakat, Gampong } = require("../models");

const {
	dataLayout,
	jumPenyaluran,
	jumGolongan,
	jumPembagianGol,
} = require("../utils/index");

/* GET home page. */
router.get("/", function (req, res) {
	res.render(
		"landingpage",
		dataLayout(req, {
			title: "PENERIMA ZAKAT BAITUL MAL",
		})
	);
});

router.get("/dashboard", async function (req, res) {
	const totPenyaluran = await jumPenyaluran();
	const totGolongan = await jumGolongan();
	const totPembagianGol = await jumPembagianGol();

	const data = {
		totPenyaluran,
		totGolongan,
		totPembagianGol,
	};

	// const dataGolongan = (data1:)
	res.render(
		"dashboard",
		dataLayout(req, {
			data,
		})
	);
});

router.get("/print", async function (req, res) {
	const golongan = req.query.golongan;
	const masyarakat = await Masyarakat.findAll({
		where: { golongan, periode: { [Sequelize.Op.not]: 0 } },
	});
	const gampong = await Gampong.findAll();
	const date = new Date();
	const user = req.session?.user;

	res.render(
		"print",
		dataLayout(req, {
			masyarakat,
			date,
			user,
			golongan,
			gampong,
		})
	);
});

module.exports = router;
