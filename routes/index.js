var express = require("express");
var router = express.Router();

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
	console.log(totPembagianGol);
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

module.exports = router;
