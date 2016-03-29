var express = require('express');
var router = express.Router();
var basex = require('basex');
var cookieParser = require('cookie-parser');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var list = [];
var resource;

router.get("/",function(req,res,next){
	var user = req.cookies.user;
	console.log('user: ' + user);
	res.render('index', { title: 'NZ Chronicles', username: user });
});

router.post('/', function(req, res) {
    var user = req.cookies.user;
	console.log('user: ' + user);
    res.render('index', { title: 'NZ Chronicles', username: user});
    // ...
});


function listifyResult(err, reply){
	list = reply.result.split("\r\n");
	console.log(list);	
				
};

module.exports = router;
