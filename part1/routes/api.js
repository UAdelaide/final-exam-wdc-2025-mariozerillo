var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dogs', function(req, res, next) {
    
});

module.exports = router;
