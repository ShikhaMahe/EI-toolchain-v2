var express = require('express');
var router = express.Router();
var path = require('path');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* GET home page. */
router.get('/login', function(req, res, next) {
	console.log('here in index.js');
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

module.exports = router;
