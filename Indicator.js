var events = require('events');
var util = require('util');

function Indicator (name, period, eventTracker) {
    this.name = name;
    this.period = period;
    this.periodData = [];
    this.record = [];
    this.eventTracker = eventTracker;
    
    
    
}

Indicator.prototype.periodDataFull = function() {
    return(this.periodData.length === this.period);
};

Indicator.prototype.addPeriodData = function(newData) {
    if(!this.periodDataFull()){
        this.periodData.push(newData);
        this.eventTracker.broadcastEvent(this.name + ' period data added');
    }
    else{
        this.periodData.shift();
        this.periodData.push(newData);
        this.eventTracker.broadcastEvent(this.name + ' period data added');
    }
    return true;
};

Indicator.prototype.addIndicatorValue = function(newValue){
    this.record.push(newValue);
    this.eventTracker.broadcastEvent('new ' + this.name + ' data', newValue);
};

module.exports = Indicator;