var express = require('express');
var router = express.Router();
var path = require('path');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
 
  
  
  
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'pages', 'login.html'));
});

/* GET Overview page. */
router.get('/overview', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'pages', 'overview.html'));
});

/* GET Overview page. */
router.get('/dod', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'pages', 'dod-analysis.html'));
});

var response = require("../public/backend-data/defectoptimize-data.js");
/* GET Testcase optimize page. */
router.get('/optimizetestcase', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'pages', 'optimize-testcase.html'));
});


/* GET Defect Optimize Data. */
router.get('/defect', function(req, res, next) {

	//res.setHeader('Content-Type', 'application/json');
    res.send(response.resp);
}); 

module.exports = router;
