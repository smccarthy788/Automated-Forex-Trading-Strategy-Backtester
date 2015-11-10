var indicatorDictionary = require('./indicators/indicatorDictionary.js');

function Indicator(indicatorPackage){
    
    this.activeIndicators = {};
    
    this.periodData = [];
    
    this.longestPeriod = checkLongestPeriod(indicatorPackage);
    

    for(var indicator in indicatorPackage){
        var obj = indicatorPackage[indicator];
        console.log(indicator);
        this.activeIndicators[indicator] = new indicatorDictionary[indicator](obj, this);
    }
    
    console.log(this.activeIndicators);
    
    
}

Indicator.updateIndicators = function(){
    
    for(var indicator in this.activeIndicators){
        try{
            indicator.update(this);
        } catch(e){
            console.log(e);
        }
    }
    
    
};

Indicator.periodDataFull = function(){
    return(this.periodData.length === this.longestPeriod);
};

Indicator.addPeriodData = function(newData){
    if(!this.periodDataFull()){
        this.periodData.push(newData);
        this.eventTracker.broadcastEvent(this.name + ' period data added', newData);
    }
    else{
        this.periodData.shift();
        this.periodData.push(newData);
        this.eventTracker.broadcastEvent(this.name + ' period data added', newData);
    }
    return true;
};

function checkLongestPeriod(indicatorPackage){
    var temp = 0;
    for(var indicator in indicatorPackage){
        if(indicator.period > temp){
            temp = indicator.period;
        }
    }
    return temp;
}

module.exports = Indicator;