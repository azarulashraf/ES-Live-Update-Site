//modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/ec-backend');

//configuring express
//serving static files
//storing all dependencies source 
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//storing all html file
app.use(express.static(__dirname + '/view'))
//__dirname : It will resolve to your project folder.

app.get('/',function(req,res){
  res.sendFile(path.join('index.html'));
});

app.get('/edit',function(req,res){
  res.sendFile(path.join('index-edit.html'));
});

app.listen(3000, function () {
  console.log('listening on localhost:3000');
});
