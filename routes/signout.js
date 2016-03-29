var express = require('express');
var router = express.Router();
var basex = require('basex');
var cookieParser = require('cookie-parser');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var list = [];
var resource;

router.get("/",function(req,res,next){
	logoutuser(res);
	res.redirect(301, '/');
});

router.post('/', function(req, res) {
	logoutuser(res);
	res.redirect(301, '/');
});


function logoutuser(res){	
	var cookieTTL = 10;
    var date = new Date();
    date.setTime(date.getTime() + cookieTTL);
    res.cookie("user", "", {expires: date}).redirect(307, '/');
}

module.exports = router;
