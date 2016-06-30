var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//use static file
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/asset', express.static(__dirname + '/asset'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/controller'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// establish connection on mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ec-backend');

//create schema like a class, field and datatype
var pagesSc = new mongoose.Schema({
	title:String,
	header:{title:String, desc:String},
	content:{philo:String, approach:String, benefit:String},
	footer:String
});

//create data model, has to match schema which is COLLECTIONS
var page = mongoose.model("pages",pagesSc);

// PAGE 
app.get('/api/page', function(req, res){
  // retrieve data
	page.find(function (err, data){
	res.json(data);
	});
});

app.get('/api/page/:id', function(req, res){
  // retrieve data by id use req to parse url
	page.findById(req.params.id, function (err, data){
	res.json(data);
	});
});


app.post('/api/page/update', function(req, res){
	// console.log(req.body);
  	// id mongo equal to parse object id
  	var id = {_id:req.body._id};
	page.update(id, req.body, function (err, data){
	console.log(err);
	console.log(data);
	});
});

// app.delete('/api/content/:id', function(req, res){
//   	// remove data
// 	content.remove({_id:req.params.id}, function(err,count){
// 		console.log(err);
// 		console.log(count);
// 		// dia update balik berapa yg tinggal
// 		content.find(function (err, data){
// 		res.json(data)
// 		});
// 	});
// });

app.listen(3000, function () {
  console.log('listening on localhost:3000');
});
