var path = require('path');
var express = require('express');
var compression = require('compression');
var config = require('./config');

var pkg = require('../package.json');
const VERSION  = pkg.version;



var app = express();

// app.set('view engine', 'ejs');
// app.set('views', frontend.path.public);

app.use(compression());
app.use(express.static('public'));


app.listen(config.port, function(err){
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server Listening at http://' + config.host + ':' + config.port);
});
