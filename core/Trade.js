function Trade(entry, lotSize, stopLoss, takeProfit, buySell){
    this.entry = entry;
    this.lotSize = lotSize;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
    this.buySell = buySell; //buy is true, sell is false
}