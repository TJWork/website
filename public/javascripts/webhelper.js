

var readcookie = function(res){
	if (res.cookies == 'undefined')
		return "";
	return res.cookie.user;
}
