var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var basex = require('basex');



var list = [];
var resource;

router.get("/",function(req,res,next){
	console.log('executeed here... : ');

	res.render('loginsignup', { title: 'NZ Chronicles'});
});


router.post('/', function(req, res) {
    var username = req.body.emailbar;
    var password = req.body.passbar;

    // Check if username already exists, and password is valid

    var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
    client.execute("OPEN data");
    var query = "XQUERY (\'" + password + "\'=string(//users/user[@name=\'" + username + "\']))";
    client.execute(query,
		function(err,result) { 
			if(!err){
				
				if (result.result == 'true'){
					console.log("result: " + result.result);
					rememberuser(username, res);
					res.redirect(307, '/');
				}else{
					console.log("result: " + result.result);
					res.render('loginsignup', { title: 'NZ Chronicles'});
				}
				
			} 
			else console.log("failed " + err);
		});
	//client.execute("LIST data", function(err,res) { if(!err) console.log(res.result)} )

    

    
    // if true, return to 
    // ...
});


function rememberuser(username, res){

    var date = new Date();
    var cookieTTL = 600000;
    date.setTime(date.getTime() + cookieTTL);
    res.cookie("user", username, {expires: date});
}

function listifyResult(err, reply){
	list = reply.result.split("\r\n");
	console.log(list);	
	
				
};


function submitForm(){
    console.log("click");


};
/*
router.get("/",function(req,res,next){
	console.log('execute0 : ' + client.state);
	
var result = client.execute("xquery db:list('data')");
console.log('execute2 result : ' + result);*/
	/*function(body){
		var $ = cheerio.load(body);
		var list = [];
		console.log('execute1 : ' + $('result'));
		$('result').each(function(i,elem){
			console.log('elem: ' + elem);
			list.push({ p: $(elem)});
		});
		res.render('index', { title: 'ECS Video Rental', images: list });
});*/
//});



//client.execute("xquery $result in db:list('data')",
//function (body) {
//var $ = cheerio.load(body);
//var list = [];
//$('result').each(function(i,elem){
//	console.log('elem: ' + elem);
//var title = $(elem).find('title').text();
//list.push({ p: title, image: url });
//});
//res.render('index', { title: 'ECS Video Rental', images: list });
//}
//);
//});




/* GET home page. *//*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
module.exports = router;
