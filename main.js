var Tracker = require('./core/Tracker.js');
var Feeder = require('./core/Feeder.js');
var EventTracker = require('./core/EventTracker.js');
var RSI = require('./indicators/Rsi.js');
var indicatorGateway= require('./IndicatorGateway.js');

module.exports = function(dataPackage) {
	console.log('now in main');
	console.log('Monthy candles: ' + dataPackage.month.length);
	console.log('Daily candles: ' + dataPackage.day.length);
	console.log('M1 Timestamp: ' + dataPackage.month[0].time);
	console.log('D1 Timestamp: ' + dataPackage.day[0].time);

	// Take config values
	var period = 14; // Defaulting to simple params for now
	// Ultimetly take this from user input or default config file
	
	
	// Initialize core
	var eventTracker = new EventTracker;
	var tracker = new Tracker(period, eventTracker);
	var feeder = new Feeder(dataPackage, eventTracker);
	
	// Initialize indicators
	var indicatorPackage = {Rsi : {name : 'test RSI', period : 14}, Stch : {name : 'test STCH', period : 14, smaPeriod : 5}}; // this is temporary
    var gateway = new indicatorGateway(indicatorPackage);
	
	var stchLowTrips = 0;
	var rsiHighTrips = 0;
	var stchHighTrips = 0;
	var rsiLowTrips = 0;
	
	while(!feeder.finished){
		gateway.updateIndicators(feeder.next().day);
		if(gateway.activeIndicators['Rsi'].lastData >= 80){
			rsiHighTrips++;
		} else if(gateway.activeIndicators['Rsi'].lastData <= 20){
			rsiLowTrips++;
		}
		if(gateway.activeIndicators['Stch'].lastK >= 80){
			stchHighTrips++;
		} else if(gateway.activeIndicators['Stch'].lastK <= 20){
			stchLowTrips++;
		}
	}
	
	console.log(rsiHighTrips);
	console.log(rsiLowTrips);
	console.log(stchHighTrips);
	console.log(stchLowTrips);
	
	
	
	/*
		So, how does this polling loop work? That's a good question Sean. Let me think about that...
		
		Well, a good place to start is to initalize everything. Especially the bits that make up the core of this.
		I'm thinking:
		- Feeder (Litterally can't do anything without this)
		- Tracker
		- EventTracker - This MUST come first.
		
		I would call these the core of this suite. 
		
		From there initialize all indicators. Take their parameters. Maybe push them into some dictionary?
		
		Rough out a polling loop
		
		- New data from Feeder
		- Check for trade Stops
		- Update all inidcators
		- Make new trade decisions
		- Update tracker
	
	*/
	
	

};