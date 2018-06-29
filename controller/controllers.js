var express = require("express");
var router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/locations',  (req, res) => {
  res.render('locations');
});

router.get('/contact', (req, res) => {
  res.render('contact');
})

router.get('/menu', (req, res) => {
  res.render('menu');
});

router.get('/join', (req, res) => {
  res.render('join');
});

module.exports = router;