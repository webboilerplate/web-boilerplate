'use strict';

var $ = require('jquery');

var AjaxifyLoader = module.exports = function() {

}


AjaxifyLoader.prototype.load = function(url) {

  var ctx = this;

  $.ajax({
      url: url,
      processData: false,
      dataType: 'html',
      context: document.body,
    })
    .done(function(data) {
      var $content = $('<html>').append($.parseHTML(data, document, true));
      var page = $content.find('.page').first().clone();

      var nextPage = {
        page: page,
        title: $content.find('title').text()
      };

      cache.set(url, nextPage);
      ctx.showPage(url);

      $content = null;

    })
    .error(function(e) {
      console.error(e);
    });

};
