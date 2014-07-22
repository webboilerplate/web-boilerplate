'use strict';

//TODO abstract the ajax loading away.

var defaults = require('./defaults');
var AjaxifyLink = require('./ajaxify-link');


var Ajaxify = module.exports = function(options) {

  this.options = options ||  {};
  for (var i in defaults) {
    if (!this.options.hasOwnProperty(i)) {
      this.options[i] = defaults[i];
    }
  }

  this.init();
};


Ajaxify.prototype.init = function() {
  this.link = new AjaxifyLink(this.options);
};
