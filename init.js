var https = require('https');
var main = require('./core/main');
var querystring = require('querystring');
var fs = require('fs');

var tests = require('./tests.js');

var todaysDate = (new Date);

var account_id = "9408602";
var access_token = "3f1731f9e1133753bf2bfb6181fb1b2a-93529c50badfb3f03c77ff644dc47771";
var instrument = "EUR_USD";
var granularity = "M";
var count = "5000";
var start = "1020729600"; // Earliest date available: Tue, 07 May 2002 00:00:00 GMT
var end = todaysDate.getTime();

var dataPackage = {};


var options = {
	host: "api-fxpractice.oanda.com",
	path: "/v1/candles?" + querystring.stringify({
	 instrument: instrument,
	 start: start,
	 end: end,
	 granularity: granularity
	}),
	method: "GET",
	headers: {"Authorization" : "Bearer " + access_token, "X-Accept-Datetime-Format" : "UNIX"}
};

function getData (ops) {

	var request = https.request(ops, function (response, error) {
		if (error) {
			throw error;
		}
		console.log("Requesting candles for " + granularity +" : " + instrument + "...");
		var response_data = "";
		console.log('Response Status: ' + response.statusCode);
		response.on('data', function (chunk) {
		//	console.log('Recieving data...');
			response_data = response_data + chunk;
		});
		response.on('end', function(){
			if (response.statusCode !== 200) {
				console.log('Something went wrong with the request!');
				console.log(response_data);
				process.exit(1);
			}
			package_data(response_data);
		});
	});
	
	request.end();

}


function package_data(response_data) {
	console.log("Packaging data...");
	var dataObject = JSON.parse(response_data);
	console.log(granularity);
	
	if (dataObject.candles.length < 5000 && dataObject.granularity === "M"){
		dataPackage.month = dataObject.candles;
		console.log("Month data added");
		options.path = "/v1/candles?" + querystring.stringify({
		 instrument: instrument,
		 start: start,
		 end: end,
		 granularity: "D"
		});
			
		getData(options);
	}
	else if (dataObject.candles.length < 5000 && dataObject.granularity === "D"){
		dataPackage.day = dataObject.candles;
		console.log("Daily data added");
	//	main(dataPackage);
		tests(dataPackage);
	}
	
}


getData(options);