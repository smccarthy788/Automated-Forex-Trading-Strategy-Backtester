function Rsi(params){
    this.name = params.name || "Rsi";
    this.period = params.period;
    this.periodData = [];
    this.record = [];
}

Rsi.prototype.update = function(newData){
    this.addPeriodData(newData);
    this.calculateRSI();
}

Rsi.prototype.periodDataFull = function() {
    return(this.periodData.length === this.period);
};

Rsi.prototype.addPeriodData = function(newData) {
    if(!this.periodDataFull()){
        this.periodData.push(newData);
    }
    else{
        this.periodData.shift();
        this.periodData.push(newData);
    }
    return true;
};

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
            this.record.push(tempRSI);
        }else{
            throw new invalidDataException(tempRSI, this);
        }
    }else{
        throw new insufficientDataException(this.period - this.periodData.length, this);
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


module.exports = Rsi;