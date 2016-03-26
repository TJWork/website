var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var basex = require('basex');

var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var list = [];
var resource;

router.get("/",function(req,res,next){
	var user = req.cookies.user;
	console.log('user: ' + user);
	res.render('browse', { title: user});
});

router.post('/', function(req, res) {
    var user = req.cookie;
	console.log('user: ' + user);
    res.render('browse', { title: 'NZ Chronicles'});
    // ...
});


function listifyResult(err, reply){
	list = reply.result.split("\r\n");
	console.log(list);	
				
};

module.exports = router;