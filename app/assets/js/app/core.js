'use strict';


var App = function() {};

var _initialized = false;


App.prototype = {

    name: 'Web Kickoff',

    model: {},
    view: {},
    controller: {},
    routes: {},

    initialize: function() {

        if (!_initialized) {

            _initialized = true;

            //TODO initialize

        }
    },

    start: function() {
        if (!_initialized) {

            this.initialize();
        }
    },

    stop: function() {

    }
};

module.exports = new App();
