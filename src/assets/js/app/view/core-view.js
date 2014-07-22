'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$ = require('jquery');

var fastdom = require('fastdom');


Backbone.View.prototype._super = function(funcName) {
  return this.constructor.prototype[funcName].apply(this, _.rest(arguments));
};

var CoreView = module.exports = Backbone.View.extend({

  childViews: [],
  defaults: {},
  /*in children use:

        defaults: _.defaults({
            somevar: somevalue
        },
        CoreView.prototype.defaults),*/


  initialize: function() {

    var ctx = this;

    if (!this.beforeRender) {
      this.beforeRender = function() {};
    }
    if (!this.afterRender) {
      this.afterRender = function() {};
    }
    if (!this.createChildren) {
      this.createChildren = function() {
        return [];
      };
    }
    this.childViews = this.createChildren();


    this.render = _.wrap(this.render, function(render) {

      if (this.fastRead) {
        fastdom.clear(this.fastRead);
      }

      if (this.fastWrite) {
        fastdom.clear(this.fastWrite);
      }

      this.fastRead = fastdom.read(function() {
        ctx.beforeRender();
      });

      this.fastWrite = fastdom.write(function() {
        render.apply(ctx);
        fastdom.clear(ctx.fastWrite);
        ctx.afterRender();
        ctx.fastWrite = null;
      });
    });
  },


  beforeRender: function() {},

  render: function() {

    _.invoke(this.childViews, 'render');

    return this.el;
  },

  afterRender: function() {},

});
