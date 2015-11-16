var events = require('events'),
    util = require('util');
    
function EventTracker() {
    this.listeners = [];
    
    events.EventEmitter.call(this);
}

util.inherits(EventTracker, events.EventEmitter);

EventTracker.prototype.broadcastEvent = function(eventString, data){
    if(data){
        this.emit(eventString,data);
    }else{
    this.emit(eventString);}
};

EventTracker.prototype.registerListener = function(eventString, handler, owner, purpose){
    this.on(eventString, handler);
    var obj = {
        listenerOwner : owner,
        listenerPurpose : purpose
    };
    obj[eventString] = handler;
    this.listeners.push(obj);
};


module.exports = EventTracker;
