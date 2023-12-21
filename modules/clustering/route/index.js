const express = require("express");
const router = express.Router();

const {
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
} = require("../helper/index");

router.post("/fakir", clusterFakir);
router.post("/miskin", clusterMiskin);
router.post("/miskin-insidentil", clusterMiskinInsidentil);
router.post("/guru-dayah", clusterGuruDayah);
router.post("/santri-dayah", clusterSantriDayah);
router.post("/anak-yatim", clusterAnakYatim);
router.post("/disabilitas", clusterDisabilitas);
router.post("/santri-dayah-luar", clusterSantriDayahLuar);
router.post("/pelajar-miskin", clusterPelajarMiskin);
router.post("/muallaf", clusterMuallaf);
router.post("/santri-muallaf", clusterSantriMuallaf);
router.post("/gharimin", clusterGharimin);
router.post("/santri-berprestasi", clusterSantriBerprestasi);
router.post("/madrasah", clusterMadrasah);
router.post("/waqaf", clusterWaqaf);
router.post("/pelajar-rantau", clusterPelajarRantau);
router.post("/ibnu-sabil", clusterIbnuSabil);

module.exports = router;
