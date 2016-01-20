function Stch(params){
    this.name = params.name || "Stch";
    this.period = params.period;
    this.SmaPeriod = params.smaPeriod || 3;
    
    this.kRecord = [];
    this.dRecord = [];
    
    this.periodData = [];
    
    this.lowestLow;
    this.highestHigh;
    
    this.lastK = 0;
    
}

Stch.prototype.update = function(newData){
    this.addPeriodData(newData);
    this.calculateStochasticK(newData);
    //this.calculateStochasticD();
    
    return true;
};

Stch.prototype.periodDataFull = function() {
    return(this.periodData.length === this.period);
};

Stch.prototype.calculateStochasticK = function(newData){
    if(this.periodDataFull()){
        var tempSTCHK = ((newData.closeBid - this.lowestLow)/(this.highestHigh - this.lowestLow) * 100);
    
        if(tempSTCHK >= 0 && tempSTCHK <= 100){
            this.kRecord.push(tempSTCHK);
            this.lastK = tempSTCHK;
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
    }
    else{
        this.periodData.shift();
        this.periodData.push(newData);
        this.isHighestHigh(newData.highBid);
        this.isLowestLow(newData.lowBid);
    }
};

Stch.prototype.isHighestHigh = function(pricePoint){
    var max = 0;
    for(var i = 0; i < this.periodData.length; i++){
        if(i == 0){
            max = this.periodData[i].highBid;
        } else if (max < this.periodData[i].highBid){
            max = this.periodData[i].highBid;
        }
    }
    this.highestHigh = max;
    //console.log('New Highest High! : ' + max);
};

Stch.prototype.isLowestLow = function(pricePoint){
    var min = 0;
    for(var i = 0; i < this.periodData.length; i++){
        if(i == 0){
            min = this.periodData[i].lowBid;
        } else if (min > this.periodData[i].lowBid){
            min = this.periodData[i].lowBid;
        }
    }
    this.lowestLow = min;
    //console.log('New Lowest Low : ' + min);
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