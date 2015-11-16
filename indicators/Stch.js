var Indicator = require('./Indicator.js');
var util = require('util');

function Stch(params){
    this.name = params.name || "Stch";
    this.period = params.period;
    this.SmaPeriod = params.smaPeriod || 3;
    this.kRecord = [];
    this.dRecord = [];
    this.periodData = [];
    
    
    this.lowestLow = 0;
    this.highestHigh = 0;
    
}

Stch.prototype.update = function(newData){
    this.addPeriodData(newData);
    this.calculateStochasticK(newData);
    //this.calculateStochasticD();
}

Stch.prototype.periodDataFull = function() {
    return(this.periodData.length === this.period);
};

Stch.prototype.calculateStochasticK = function(newData){
    if(this.periodDataFull()){
        var tempSTCHK = ((newData.closeBid - this.lowestLow)/(this.highestHigh - this.lowestLow) * 100);
    
        if(tempSTCHK >= 0 && tempSTCHK <= 100){
            this.kRecord.push(tempSTCHK);
        }else{
            throw new invalidDataException(tempSTCHK, this);
        }
    }else{
        throw new insufficientDataException(this.period - this.periodData.length, this);
    }    
};

Stch.prototype.calculateStochasticD = function(){
    if(this.kRecord.length < this.smaPeriod){
        var sum = 0;
        for(var i = this.kRecord.length - 1; i > this.kRecord.length - 3; i--){
            sum += this.kRecord[i];
        }
        var tempSTCHD = sum / this.smaPeriod;
        if(tempSTCHD >= 0 && tempSTCHD <= 100){
            this.dRecord.push(tempSTCHD);
        }else{
            throw new invalidDataException(tempSTCHD, this);
        }
    }else{
        throw new insufficientDataException(this.kRecord.length - this.smaPeriod, this);
    }
};

Stch.prototype.addPeriodData = function(newData) {
    if(!this.periodDataFull()){
        this.periodData.push(newData);
        this.isHighestHigh(newData.highBid);
        this.isLowestLow(newData.lowBid);
        //this.eventTracker.broadcastEvent(this.name + ' period data added');
    }
    else{
        this.periodData.shift();
        this.periodData.push(newData);
        this.isHighestHigh(newData.highBid);
        this.isLowestLow(newData.lowBid);
        //this.eventTracker.broadcastEvent(this.name + ' period data added');
    }
    return true;
};

Stch.prototype.isHighestHigh = function(pricePoint){
    if(pricePoint > this.highestHigh){
        this.highestHigh = pricePoint;
        //console.log('New Highest High! : ' + this.highestHigh);
    }
};

Stch.prototype.isLowestLow = function(pricePoint){
    if(pricePoint < this.lowestLow){
        this.lowestLow = pricePoint;
        //console.log('New Lowest Low! : ' + this.lowestLow);
    }
};

function insufficientDataException(numMissing, owner){
    this.name = 'Insufficient Data Exception';
    this.message = 'There is insufficient data to calculate the ' + owner.name;
    this.numMissing = numMissing;
}

function invalidDataException(invalidData, owner){
    this.name = 'Invalid Data Exception';
    this.message = 'The value: ' + invalidData + ' is invalid for ' + owner.name;
}

module.exports = Stch;