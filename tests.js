var Indicator = require('./Indicator.js');
var Rsi = require('./Rsi.js');
var EventTracker = require('./EventTracker.js');

    
    module.exports = function (dataPackage){
        var eT = new EventTracker;
        var testRSI = new Rsi('RSI', 14, eT);
        var exceptionLog = [];
        var eventCatch = []; // will pass in new RSI values. Easy to check if testRSI.record.length === eventCatch.length -> would mean the event was caught each time
        
        testRSI.eventTracker.registerListener('new RSI data', function(newRSI){
            eventCatch.push(newRSI);
        });
      
        for(var i = 0; i < dataPackage.day.length; i++){
            testRSI.addPeriodData(dataPackage.day[i]);
            try {
                testRSI.calculateRSI();
            }catch(e){
                exceptionLog.push(e);
            }
            
        }
        
        console.log('Event Catch : ' + eventCatch.length);
        console.log('RSI record : ' + testRSI.record.length);
        console.log(testRSI.eventTracker.listeners);
        
        console.log(dataPackage.day[0]);
};





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