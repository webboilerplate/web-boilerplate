/**
 * [console Polyfill]
 */
if (typeof window.console === 'undefined') {
  window.console = {
    log: function() {},
    info: function() {},
    warn: function() {},
    error: function() {},
    dir: function() {}
  };
}


/**
 * [CustomEvent Polyfill]
 */
if (typeof window.CustomEvent === 'undefined') {

  window.CustomEvent = function(event, params) {
    'use strict';
    var evt;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  window.CustomEvent.prototype = window.Event.prototype;
}


/**
 * [isArray Polyfill]
 */
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(arg) {
    'use strict';
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}


/**
 * [bind Polyfill]
 */
if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function(oThis) {

    'use strict';
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      FunctionNOP = function() {},
      FunctionBound = function() {
        return fToBind.apply(this instanceof FunctionNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    FunctionNOP.prototype = this.prototype;
    FunctionBound.prototype = new FunctionNOP();

    return FunctionBound;
  };
}


/**
 * [requestAnimationFrame Polyfill]
 */
if (typeof window.requestAnimationFrame === 'undefined') {

  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      'use strict';

      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      'use strict';
      clearTimeout(id);
    };
  }
}
