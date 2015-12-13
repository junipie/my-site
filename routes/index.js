var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Juniper Emnett' });
});

router.get('/cv', function(req, res, next) {
  res.render('./cv.ejs', { title: 'Juniper Emnett'});
});

router.get('/contact', function(req, res, next) {
  res.render('./contact.ejs', { title: 'Juniper Emnett'});
});

router.get('/blog', function(req, res, next) {
  res.render('./blog.ejs', { title: 'Juniper Emnett'});
});

router.get('/post', function(req, res, next) {
  res.render('./blog_poster.ejs', { title: 'Juniper Emnett'});
});

module.exports = router;
