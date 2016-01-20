var events = require('events');
var util = require('util');

function Feeder(dataPackage, eventTracker){
    this.pointer = -1;
    this.monthPointer = 0;
    this.currentDate = getDate(dataPackage.day[0].time);
    this.currentMonth = this.currentDate.getMonth();
    this.finished = false;
    this.currentData = undefined;
    
    this.eventTracker = eventTracker;
    
    this.next = function(){
      this.pointer++;
      
      if(this.pointer === dataPackage.day.length - 1){this.finished = true;}
      
      var returnObject= {
          day: dataPackage.day[this.pointer]
      };
      
     // console.log(dataPackage.day[this.pointer]);
     // console.log(this.pointer);
      
      
      if( (this.currentMonth < getDate(dataPackage.day[this.pointer].time).getMonth()) 
      || (this.currentMonth === 11 && getDate(dataPackage.day[this.pointer].time).getMonth() === 0 ) ){
          returnObject.month = dataPackage.month[this.monthPointer];
          this.monthPointer++;
      }
      this.currentDate = getDate(dataPackage.day[this.pointer].time);
      this.currentMonth = this.currentDate.getMonth();
      this.currentData = returnObject;
      this.eventTracker.broadcastEvent('new data', returnObject);
      return returnObject;
    };

}

function getDate(microSecondTimeStamp){
    return new Date(microSecondTimeStamp.toString().substring(0,microSecondTimeStamp.toString().length - 3));
}

module.exports = Feeder;