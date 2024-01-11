var express = require("express");
var router = express.Router();

const { Masyarakat, Gampong } = require("../models");

const { dataLayout } = require("../utils/index");

/* GET home page. */
router.get("/", function (req, res) {
	res.render(
		"dashboard",
		dataLayout(req, {
			title: "PENERIMA ZAKAT BAITUL MAL",
		})
	);
});

module.exports = router;
