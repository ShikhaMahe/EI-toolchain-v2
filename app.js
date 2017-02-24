var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

var routes = require('./routes/index');
//var users = require('./routes/user');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

app.get('/fetchdefectdetails',function(request,response){
	 
	 console.log("fetchdefectdetails called****************");
	// readFile();
	// var category = request.body.cat;
	
	 
	 var options = {
			  host: 'engginginsights-service.mybluemix.net',
			  port: 443,
			  path: '/getAllDefects',
			  method: 'GET'
			};

			var req = https.request(options, function(res) {
			  
			  console.log(res.statusCode);
			  res.on('data', function(d) {
			    process.stdout.write(d);
			  });	
			  
			  console.log(res);
			  
			});
			
			req.end();

			req.on('error', function(e) {
			  console.error(e);
			});
});	

app.get('/test',function(request,response){
    var responseString = '';
    //response.json(200, {'test': 'it works!'})
    var data = "{'test': 'it works!'}";
    console.log("hey hey called****************");
     console.log("fetchdefectdetails called****************");

     //   response.json(200, {'test': 'it works!'})

    var options = {
              host: 'engginginsights-service.mybluemix.net',
             // port: 443,
              path: '/getAllDefects',
              method: 'GET'
            };

    var request = https.request(options, function(response) {
    console.log("fetchdefectdetails called****************");
    response.setEncoding('utf-8');



    response.on('data', function(data) {
      responseString += data;
    });

    response.on('end', function() {
      console.log('am hereeee '+responseString);
      console.log('doneee');
      // success(responseString);
      // var responseObject = JSON.parse(responseString);

    });
  });
    
    

console.log("dataString called****************");


}); 


module.exports = app;

/*http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});
*/
