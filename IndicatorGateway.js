var indicatorDictionary = require('./indicators/indicatorDictionary.js');

function indicatorGateway(indicatorPackage){
    
    this.activeIndicators = {};
    this.exceptions = [];
    
    for(var indicator in indicatorPackage){
        var obj = indicatorPackage[indicator];
        this.activeIndicators[indicator] = new indicatorDictionary[indicator](obj, this);
    }
    
}

indicatorGateway.prototype.updateIndicators = function(newData){
    for(var indicator in this.activeIndicators){
        try{
            this.activeIndicators[indicator].update(newData);
        } catch(e){
            this.exceptions.push(e);
            //console.log(e.message + " " + indicator);
        }
    }
};

indicatorGateway.createNewIndicator = function(indicator){
    this.activeIndicators[indicator.name] = new indicatorDictionary[indicator.type](indicator.params, this);
};

module.exports = indicatorGateway;