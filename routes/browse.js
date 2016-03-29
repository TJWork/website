var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var basex = require('basex');

var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var list = [];
var jsonList = [];
var resource;
var filter = 0;

router.get("/",function(req,res,next){
	var user = req.cookies.user;
	console.log('user: ' + user);
	filterdirectory();
	
	res.render('browse', { username: user, titles: jsonList});
});

router.post('/', function(req, res) {
    var user = req.cookie;
	console.log('user: ' + user);
    res.render('browse', { username: user});
    // ...
});


var filterdirectory = function(){
	client.execute('Open data');
	//var query = "XQUERY  declare namespace tei= 'http://www.tei-c.org/ns/1.0'; " +
	//"(//tei:TEI[contains(@xml:id, \"PrL\")]//tei:title/text())";
	//"(//tei:title/text())"; // Get all titles
	//"(//tei:TEI[@xml:id=\"PrL-1112\"]//tei:title/text())"; // get all titles where xml:id="PrL-1112"
/*var query = "XQUERY  declare namespace tei= 'http://www.tei-c.org/ns/1.0'; " +
	"for $r in //tei:TEI " +
		"let $header := $r//tei:teiHeader//tei:fileDesc//tei:titleStmt "
		"let $t := $header//tei:title/text() " + 
		"let $a := $header//tei:author//tei:name/text() " + 
	"return concat(\"{\", $t, \"/\", $a, \"}\")";*/
	

	/*var query = "XQUERY  declare namespace tei= 'http://www.tei-c.org/ns/1.0'; " +
	"let $thedoc := //tei:TEI " +
	"for $r in $thedoc " +
		"let $title := $r//tei:titleStmt/tei:title/text() " + 
		"let $author := $r//tei:titleStmt/tei:author/tei:name/text() " + 
	"return concat($title, \"^\", $author)";*/
	client.execute("LIST data", function(err,res) { 
		if(!err) {
			var docs = res.result.split('\r\n');
			for (var i = 0; i != docs.length; ++i){
				var t2 = docs[i].split(/[\t ]/);
				console.log(t2[0]);
				client.execute("XQUERY doc(\"data/" + t2[0] + "\")", function(err2,res2) {
					console.log(res2.result);
				});
				
				
			}
			//console.log(res.result)

		}



	});

/*
	var query = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; " +
	"let $thedoc := //TEI " +
	"for $r in $thedoc " +
		"let $title := $r//titleStmt/title/text() " + 
		"let $author := $r//titleStmt/author/name/text() " +
	"return concat($title, \"^\", $author)";




	client.execute(query, function listifyResult(err, reply){
		list = reply.result.split("\r\n");
		jsonList = [list.length];
		for (var i = 0; i != list.length; ++i){
			var tempList = list[i].split("^");
			console.log("{ \"title\" : \"" + tempList[0] + "\", \"author\" : \"" + tempList[1] + "\" }");
			list[i] = "{ \"title\" : \"" + tempList[0] + "\", \"author\" : \"" + tempList[1] + "\" }";
			jsonList[i] = JSON.parse("{ \"title\" : \"" + tempList[0] + "\", \"author\" : \"" + tempList[1] + "\" }");
		}
	});
*/

/*
	var newlist = [list.length];
	var count = 0;
	for (var i = 0; i != list.length; ++i){
		if (filter == 1){
			var dirs = list[i].split("/");
			for (var j = 0; j != dirs.length; ++j){

			}
		}
	}*/
}

module.exports = router;