var Indicator = require('./indicators/Indicator.js');
var Rsi = require('./indicators/Rsi.js');
var EventTracker = require('./core/EventTracker.js');
var Stch = require('./indicators/Stch.js');
var indicatorGateway = require('./IndicatorGateway.js');


/*
##########################
Indicator as Gateway tests
##########################
*/
module.exports = function(dataPackage){
    
    var indicatorPackage = {Rsi : {name : 'test RSI', period : 14}, Stch : {name : 'test STCH', period : 14, smaPeriod : 5}};
    var testGateway = new indicatorGateway(indicatorPackage);
    


    for(var i = 0; i < 20; i++){
        testGateway.updateIndicators(dataPackage.month[i]);
        console.log(dataPackage.month[i]);
    }
    
    console.log(testGateway.activeIndicators['Rsi'].record);
    console.log(testGateway.activeIndicators['Stch'].kRecord);
    
    //console.log(testGateway.exceptions);

};




/*
#############
indicatorGateway indicator creation tests
#########################################

var indicatorPackage = {Rsi : {period : 14,
                  granulatiry : "ok"},
            Stch : {period : 14
                    }
};
var testGateway = 0;


testGateway = new indicatorGateway(indicatorPackage);

console.log(testGateway);

*/

/*
module.exports = function(dataPackage){
    var eT = new EventTracker;
    var testStch = new Stch('testStch', 14, 3, eT);
    var exceptionLog = [];
    var eventCatch = [];
    

    for(var i = 0; i < 20; i++){
        testStch.addPeriodData(dataPackage.day[i]);
            try {
                testStch.calculateStochasticK();
            }catch(e){
                exceptionLog.push(e);
                //console.log(e);
            }
    }
    
    
    console.log('Event Catch : ' + eventCatch.length);
    console.log('STCH record : ' + testStch.kRecord.length);
    console.log('STCH Value : ' + testStch.kRecord[0]);
    console.log('Event Catch value : ' + eventCatch[0]);
    console.log('Exceptions : ' + exceptionLog[0].message);
    console.log('Exception : ' + exceptionLog[19].message);
    console.log(testStch.eventTracker.listeners);
   
   
    
};
*/


/*
#############################
RSI using Event Tracker tests
#############################
    
    module.exports = function (dataPackage){
        var eT = new EventTracker;
        var testRSI = new Rsi('RSI', 14, eT);
        var exceptionLog = [];
        var eventCatch = []; // will pass in new RSI values. Easy to check if testRSI.record.length === eventCatch.length -> would mean the event was caught each time
        
        testRSI.eventTracker.registerListener('new RSI data', function(newRSI){
            eventCatch.push(newRSI);
        }, testRSI, 'catch new RSI data');
        testRSI.eventTracker.registerListener('RSI period data added', function(newData){
            console.log(newData);
        }, testRSI, 'catch new RSI period data');
      
        for(var i = 0; i < 20; i++){
            testRSI.addPeriodData(dataPackage.day[i]);
            try {
                testRSI.calculateRSI();
            }catch(e){
                exceptionLog.push(e);
            }
            
        }
        
        console.log('Event Catch : ' + eventCatch.length);
        console.log('RSI record : ' + testRSI.record.length);
        console.log('RSI Value : ' + testRSI.record[0]);
        console.log('Event Catch value : ' + eventCatch[0]);
        console.log(testRSI.eventTracker.listeners);
        
        console.log(dataPackage.day[0]);
};

#################################
End RSI using Event Tracker tests
#################################
*/



/*

#####################
INDICATOR CLASS TESTS
#####################

var testIndicator = new Indicator(14);

var i = 0;
var validPeriodDatas = [];

while(i < 20){
    
    validPeriodDatas.push(testIndicator.periodDataFull());
    var newData = {test : "This is a test object"};
    testIndicator.addPeriodData(newData);
    
    i++;
}

testIndicator.on('period data updated', function(){
        console.log("Caught corrent event: period data updated"); 
});

console.log(validPeriodDatas.length);
console.log(testIndicator.periodData.length);

###################
END INDICATOR TESTS
###################
*/

/*

#####################
RSI INHERITENCE TESTS
#####################

var testRSI = new Rsi2(14);
var testRSI2 = new Rsi2(3);

console.log(typeof testRSI.periodDataFull());

for(var i = 0; i < 20; i++){
    testRSI.addPeriodData(i);
    testRSI2.addPeriodData(i);
}

console.log(testRSI.periodDataFull());
console.log(testRSI2.periodDataFull());

console.log(testRSI.periodData);
console.log(testRSI2.periodData);

console.log(testRSI.calculateRSI());
console.log(testRSI2.calculateRSI());

console.log(testRSI.record);
console.log(testRSI2.record); 

*/

/* 
################
new RSI tests
################
module.exports = function (dataPackage){
    var testRSI = new Rsi2('RSI', 14);
    var exceptionLog = [];
  //  var testIndicator = new Indicator(14);
    
   // console.log(Object.getOwnPropertyNames(testRSI));
    //console.log(Object.getOwnPropertyNames(testIndicator));
  
    for(var i = 0; i < dataPackage.day.length; i++){
        testRSI.addPeriodData(dataPackage.day[i]);
        try {
            testRSI.calculateRSI();
        }catch(e){
            exceptionLog.push(e);
        }
        
    }
    
    
    console.log(testRSI.record.length);
    console.log(testRSI.record[1]);
    console.log(exceptionLog.length);
    console.log(exceptionLog[0]);
    console.log(exceptionLog[exceptionLog.length-1]);
}
    */