var Indicator = require('./Indicator.js');
var util = require('util');

function Stch(params ,gateWay, smaPeriod){
    this.period = params.period;
    this.SmaPeriod = params.smaPeriod || 3;
    this.kRecord = [];
    this.dRecord = [];
    this.periodData = [];
    
    
    this.lowestLow = 0;
    this.highestHigh = 0;
    
}

util.inherits(Stch, Indicator);

Stch.prototype.calculateStochasticK = function(){
    if(this.periodDataFull()){
        var tempSTCHK = ((this.periodData[this.periodData.length -1].closeBid - this.lowestLow)/(this.highestHigh - this.lowestLow) * 100);
        console.log((this.periodData[this.periodData.length -1].closeBid - this.lowestLow));
        console.log((this.highestHigh - this.lowestLow));
    
        if(tempSTCHK > 0 && tempSTCHK < 100){
            this.addIndicatorValue(tempSTCHK);
        }else{
            throw new invalidDataException(tempSTCHK);
        }
    }else{
        throw new insufficientDataException(this.period - this.periodData.length);
    }    
};

Stch.prototype.calculateStochasticD = function(){
    if(this.kRecord.length < this.smaPeriod){
        var sum = 0;
        for(var i = this.kRecord.length - 1; i > this.kRecord.length - 3; i--){
            sum += this.kRecord[i];
        }
        var tempSTCHD = sum / this.smaPeriod;
        if(tempSTCHD > 0 && tempSTCHD < 100){
            this.addIndicatorValue(tempSTCHD);
        }else{
            throw new invalidDataException(tempSTCHD);
        }
    }else{
        throw new insufficientDataException(this.kRecord.length - this.smaPeriod);
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
        //this.eventTracker.broadcastEvent(this.name + ' period data added');
    }
    return true;
};

Stch.prototype.isHighestHigh = function(pricePoint){
    if(pricePoint > this.highestHigh){
        this.highestHigh = pricePoint;
        console.log('New Highest High! : ' + this.highestHigh);
    }
};

Stch.prototype.isLowestLow = function(pricePoint){
    if(pricePoint < this.lowestLow){
        this.lowestLow = pricePoint;
        console.log('New Lowest Low! : ' + this.lowestLow);
    }
};

function insufficientDataException(numMissing){
    this.name = 'Insufficient Data Exception';
    this.message = 'There is insufficient data to calculate the ' + this.name;
    this.numMissing = numMissing;
}

function invalidDataException(invalidData){
    this.name = 'Invalid Data Exception';
    this.message = 'The value: ' + invalidData + ' is invalid for ' + this.name;
}

module.exports = Stch;