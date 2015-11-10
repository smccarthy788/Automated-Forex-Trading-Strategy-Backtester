var Indicator = require('./Indicator.js');
var util = require('util');

function Rsi(params, gateWay){
    //this.name = name;
    this.period = params.period;
    //this.periodData = [];
    this.record = [];
    //this.eventTracker = eventTracker;
    
    this.periodData = gateWay.periodData;
    
    
}

util.inherits(Rsi, Indicator);

Rsi.update = function(gateWay){
    this.periodData = gateWay.periodData;
    this.calculateRSI();
}

Rsi.prototype.calculateRSI = function() {

    if(this.periodDataFull()){
        var moves = [];
        for(var i = 0; i < this.period-1; i++){
            moves.push(this.periodData[i].closeBid - this.periodData[i+1].closeBid);
        }
        var upMoves = 0, downMoves = 0;
        for(i = 0; i < moves.length; i++){
            if(moves[i] > 0){
                upMoves += moves[i];
            } else {
                downMoves =+ moves[i] * -1;
            }
        }
        var avgUp = upMoves / this.period;
        var avgDown = downMoves / this.period;
        
        var RS = avgUp / avgDown;
        var tempRSI = 100 - (100 / (1 + RS));
        
        if((tempRSI >= 0) && (tempRSI <= 100)){
            this.addIndicatorValue(tempRSI);
        }else{
            throw new invalidDataException(tempRSI);
        }
    }else{
        throw new insufficientDataException(this.period - this.periodData.length);
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


module.exports = Rsi;