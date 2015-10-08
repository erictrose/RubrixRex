
//NPM MOdules
var express 	= require('express'),
 	http 		= require('http'),
 	exphbs 		= require('express-handlebars')
	path 		= require('path');

var app = express();


// Port
// =============================================================================
app.set('port', process.env.PORT || 3000);



// View engine
// =============================================================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static file folders
// =============================================================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('views', path.join(__dirname, 'views'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
// =============================================================================
require('./routes/routes')(app);

// Start Server
// =============================================================================
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
