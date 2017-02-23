var express = require('express');
var app = express();
var db = require('./model/db');
var siswa = require('./model/siswa');
var ppdb = require('./routes/index');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/static', express.static(__dirname + '/public'));
app.use('/', ppdb);


app.listen(2017, function(){
   console.log('Server Web sedang berjalan pada port 2017');
});
