'use strict';

var SimpleCache = module.exports = function(config) {

  config = config ||  {};
  var _cache = {};
  var _max = config.max === 0 ? 0 : (config.max) ? config.max : 4;

  this.set = function(id, value) {
    _cache[id] = value;
  };

  this.get = function(id) {
    return _cache[id];
  };

  this.has = function(id) {
    return _cache[id] !== undefined;
  };

  this.clear = function() {
    _cache = {};
  };

};
