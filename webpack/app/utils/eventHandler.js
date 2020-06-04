/**
 * event 处理类
 */
class EventHandler{
    constructor(host) {
        this.eventList = {};
        this.eventRely = {};
        this.host = host;
    }
    on(eventName, handler) {
        if (typeof eventName != 'string') {
            console.log("eventName must be a string!");
            return false;
        }
        if (typeof handler != 'function') {
            console.log("event handler must be a function!");
            return false;
        }	
        if (!(eventName in this.eventList)) {
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(handler);
        return this;//to support chain method
    }
    rely(eventName, relyEventList) {
        if (this.eventRely[eventName] == undefined) {
            this.eventRely[eventName] = [];
        } 
        for (var i = 0; i < relyEventList.length; i++) {
            if (this.eventRely[eventName].indexOf(relyEventList[i]) == -1) {
                this.eventRely[eventName].push(relyEventList[i]);
            }
        }
    }
    off(eventName, handler) {
        if (typeof eventName != 'string') {
            console.info("eventName must be a string!");
            return false;
        }
        if (handler == undefined) {
            //remove all handlers
            this.eventList[eventName] = [];
            return this;//to support chain method
        } else {
            if (typeof handler != 'function') {
                console.info("event handler must be a function!");
                return false;
            }
            if (this.eventList[eventName] == undefined) {
                console.log("'" + evnetName + "' has not been registered!");
            } else {
                for (var i = 0; i < this.eventList[eventName].length; i++) {
                    if (this.eventList[eventName][i] === handler) {
                        this.eventList[eventName].splice(i,1);
                        i--;
                    }
                }
            }
        }
    }
    emit(eventName, data) {
        if (typeof eventName != 'string') {
            console.info("eventName must be a string!");
            return false;
        }
        if (!this.eventList[eventName]) {
            console.log("'" + eventName + "' emitted before defined!");
            this.checkRely(eventName);
            return;
        }
        for (var i = 0; i < this.eventList[eventName].length; i++) {
            var handler = this.eventList[eventName][i];
            if (!!this.host) {
                handler.call(this.host, data);
            } else {
                handler(data);
            }
        }
        this.checkRely(eventName);
    }
    checkRely(eventName) {
        for (var relyEvent in this.eventRely) {
            for (var i = 0; i < this.eventRely[relyEvent].length; i++) {
                if (this.eventRely[relyEvent][i] == eventName) {
                    this.eventRely[relyEvent].splice(i,1);
                    break;
                }
            }
            if (this.eventRely[relyEvent].length == 0) {
                var relyEventName = relyEvent;
                delete this.eventRely[relyEvent];
                this.emit(relyEventName);
            }
        }
    }
}

module.exports = EventHandler;