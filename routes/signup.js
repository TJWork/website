var express = require('express');
var router = express.Router();
var basex = require('basex');
var cookieParser = require('cookie-parser');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var list = [];
var resource;

router.get("/",function(req,res,next){
	res.render('signup', { title: 'NZ Chronicles'});
});

router.post('/', function(req, res) {
	res.render('signup', { title: 'NZ Chronicles'});
});


module.exports = router;
