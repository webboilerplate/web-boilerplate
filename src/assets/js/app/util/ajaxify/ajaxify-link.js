'use strict';


var $ = require('jquery');
var defaults = require('./defaults');

var History = window.history;

//console.log(History.getRootUrl());


var AjaxifyLink = module.exports = function(options) {

  this.options = options ||  {};
  this.fistrun = true;
  for (var i in defaults) {
    if (!this.options.hasOwnProperty(i)) {
      this.options[i] = defaults[i];
    }
  }

  this.init();
};


AjaxifyLink.prototype.init = function() {

  if (window.history && window.history.pushState) {
    $(document).on('click', this.options.selector, this.onRequestLink.bind(this));
    // $(document).on('click', 'a[href^="/"]', this.onRequestLink.bind(this));
  }
};



AjaxifyLink.prototype.onRequestLink = function(event) {

  var link = event.currentTarget;

  if (link.tagName.toUpperCase() !== 'A') {
    throw 'requires an anchor element';
  }

  var passThrough = link.hasAttribute('data-external-link');

  // Middle click, cmd click, and ctrl click should open
  // links in a new tab as normal.
  if (passThrough || event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  // Ignore cross origin links
  if (location.protocol !== link.protocol || location.hostname !== link.hostname) {
    return;
  }

  // Ignore anchors on the same page
  if (link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, '')) {
    return;
  }

  // Ignore empty anchor "foo.html#"
  if (link.href === location.href + '#') {
    return;
  }

  // Ignore event with default prevented
  if (event.isDefaultPrevented()) {
    return;
  }

  event.preventDefault();

  var href = link.getAttribute('href');
  var url = href;
  // var url = href.replace(/^\//, '').replace('\#\!\/', '');

  //TODO call link
  console.log('url requested :: ' + url);
  this.updateHistory(url);

  return false;

};

AjaxifyLink.prototype.updateHistory = function(url) {

  console.log('url', url);

  // If this is the first time pjax has run, create a state object for the current page.
  // if (this.firstrun) {
  //   window.history.replaceState({
  //     'url': document.location.href,
  //     //'container': options.container.id,
  //     'title': document.title
  //   }, document.title);
  //   this.firstrun = false;
  // }
  // Update browser history
  if (window.history && window.history.pushState) {

    window.history.pushState(null, null, url);

    // if (options.autoAnalytics && options.history) {

    //   if (window._gaq) _gaq.push(['_trackPageview']);
    //   if (window.ga) ga('send', 'pageview', {
    //     'page': url,
    //     'title': title
    //   });
    // }
  }

};
