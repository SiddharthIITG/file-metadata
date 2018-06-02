'use strict';

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var debug = require('debug');
var multer = require('multer');
var upload = multer();
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(morgan('tiny'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const file = req.file;
  const fileSize = file.filesize;
  res.end(fileSize);
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
