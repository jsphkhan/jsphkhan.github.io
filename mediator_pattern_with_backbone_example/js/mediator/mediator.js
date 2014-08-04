define(function() {
  /*
  * Mediator Pattern definition 
  */
  var mediator = (function(){
    console.log('Mediator started');

    //private API's - not exposed to users. This uses the Facade pattern
    var _subscribe = function(channel, fn) {
      if (!mediator.channels[channel]) {
        mediator.channels[channel] = [];
      }
      mediator.channels[channel].push({ context: this, callback: fn });
      return this;
    }

    var _publish = function(channel) {
      if (!mediator.channels[channel]) { 
        return false;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
          var subscription = mediator.channels[channel][i];
          subscription.callback.apply(subscription.context, args);
      }
      return this;
    }

    //Public High Level API
    return {
      channels: {},
      subscribe: _subscribe,
      publish: _publish,
      installTo: function(obj) {
        obj.subscribe = _subscribe;
        obj.publish = _publish;
      }
    };
  }());

  return mediator;
});


