var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");

var getAuthorList = function(){
	client("xquery //name", listifyResult);
	console.log('open data : ' + client.state);
};

var listifyResult = function(err, reply){
	console.log(reply.result);
};


/**
 * Description
 * @method print
 * @param {} err
 * @param {} reply
 * @return 
 */
function print(err, reply) {
	if (err) {
		console.log("Error: " + err);
	} else {
		var t2=new Date();
		console.log("Execution completed in ",t2-t0," milliseconds.");
		console.dir(reply);
	}
}; 
var t0=new Date();