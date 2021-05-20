var bitcoin = require('bitcoinjs-lib');
var fs = require('fs');
var maxKeys = 10;

var outputFile = "private_key.txt";
var stream = fs.createWriteStream(outputFile);
stream.once('open', function(fd) {
	for(var i=0; i<maxKeys; i++) {
		let testnet = bitcoin.networks.testnet;
		let keypair = bitcoin.ECPair.makeRandom(testnet);
		let addr = keypair.getAddress();
		let pk = keypair.toWIF();
		var line = [i, " Address :",addr," PrivateKey :",pk];
		stream.write(line.join(","));
		stream.write("\n");
	}
	stream.end();
});