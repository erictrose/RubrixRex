
var mongoose = require( 'mongoose' );
 
var unString = 'mongodb://<dbuser>:<dbpassword>@ds029814.mongolab.com:29814/heroku_l631wd40' || process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://localhost:27017/<somthing>';

//MONGOOSE CONECTION
mongoose.connect(unString, function(err, res){
	if(err){
		console.log('ERROR CONECTING TO DATABASE');
	}else{
		console.log('CONNECTED TO DATABASE');
	}
});
