var Trade = require('./Trade.js');
var events = require("events");
var util = require('util');

function Tracker (period, eventTracker) {
    
    this.profitLoss = 0;
    this.numTrades = 0;
    this.goodTrades = 0;
    this.badTrades = 0;
    
    this.leverage;
    
    this.inTrade;
    this.activeTrades = [];
    this.tradeRecord = [];
    
    this.eventTracker = eventTracker;
    
    this.enterTrade = function (entryPrice, lotSize, stopLoss, takeProfit, buySell){
        var trade = new Trade(entryPrice, lotSize, stopLoss, takeProfit, buySell);
        this.activeTrades.push(trade);
        this.inTrade = true;
        this.numTrades++;
        this.eventTracker.broadcastEvent('entered trade', trade);
    };

    this.exitTrade = function (exitPrice, trade){
        
        //calculate profit/loss
        if(trade.buySell){ // true inicates trade is a buy
            // profit happens when price increases
            var pipPL = exitPrice - trade.entry;
            
            var profitLoss = pipPL * trade.lotSize;
            this.profitLoss += profitLoss;
        }else{ // this was a sell trade
            // profit happens when price decreases
            pipPL = trade.entry - exitPrice;
            
            profitLoss = pipPL * trade.lotSize;
            this.profitLoss += profitLoss;
        }
        
        //remove trade from active trades
        var index = this.activeTrades.indexOf(trade);
        this.activeTrades = this.activeTrades.splice(index, 1);
        //push to record
        this.tradeRecord.push(trade);
        
        //update tracker vars
        if (profitLoss > 0){
            this.goodTrades++;
        }else{
            this.badTrades++;
        }
        this.eventTracker.broadcastEvent('exited trade', trade);
    };
    
    this.addTradeStop = function(stopType, pricePoint){
        
    };
    
    function getDate(microSecondTimeStamp){
        return new Date(microSecondTimeStamp.toString().substring(0,microSecondTimeStamp.toString().length - 3));
    }
    
}

module.exports = Tracker;