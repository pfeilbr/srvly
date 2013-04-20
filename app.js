
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var api = express();

// all environments
api.set('views', __dirname + '/views');
api.set('view engine', 'ejs');
api.use(express.favicon());
api.use(express.logger('dev'));
api.use(express.bodyParser());
api.use(express.methodOverride());
api.use(express.cookieParser('your secret here'));
//api.use(express.session());
api.use(api.router);
api.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api);

api.get('/log', function(req, res) {
	res.send(JSON.stringify(req.query));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/hello', function(req, res){
  res.send('Hello There');
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
