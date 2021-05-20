var prompt = require('cli-prompt');
var request = require('request');

var satoshiToBTC = function(value) {
	return value*0.00000001;
}

prompt('Enter a btc addres',function (address){
	var url = "https://blockchain.info/address/"+ address +"?format=json";
	console.log(url);
	request(url,function(error,response,body){
		//console.log(body);
		if (!error && response.statusCode == 200) {
			//console.log("ddg")
			var result = JSON.parse(body);
			
			console.log("rx:"+satoshiToBTC(result.total_received));
			console.log("sent:"+satoshiToBTC(result.total_sent));
			console.log("bal:"+satoshiToBTC(result.final_balance));
		}
		else
		{
			console.log("unable to find adress");
			if(error) console.log("error",error)
		}
	});
});