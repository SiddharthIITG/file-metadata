'use strict';

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var debug = require('debug');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');
var upload = multer();
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:false})); //handle body requests
app.use(bodyParser.json()); // let's make JSON work too!

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
     res.render('index');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const file = req.file;
  const fileSize = file.size;
  const fileName = file.originalname;
  var jsonObj = JSON.stringify({Filename: fileName, Size: fileSize}, null, 2);
  res.render('metadata', {jsonObj: jsonObj});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
