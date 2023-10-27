var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('dashboard', dataLayout(req, { 
//     title: 'PENERIMA ZAKAT BAITUL MAL' }));
// });

router.get('/', function(req, res, next) {
  res.render('dashboard', {
    layout:"layouts/main-layouts",
    title: 'PENERIMA ZAKAT BAITUL MAL'
  });
});

module.exports = router;
