'use strict';

var config = require('./');
var path = require('path');

module.exports = {

  src : path.resolve(config.path.src, config.path.sprites) + '/**/*.{png,jpg,gif}',
  dest: path.resolve(config.path.build, config.path.css),

  sprites: [

    //common sprite:

    {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/common/*.{png,jpg,gif}',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/common/*@2x.{png,jpg,gif}',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/common/*@3x.{png,jpg,gif}'
      ],

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss',
        padding: 10,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image.replace('.png', '').replace('.jpg', '').replace('.gif', '');
        },
      }
    }, {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/common/*@2x.{png,jpg,gif}',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/common/*@3x.{png,jpg,gif}'
      ],

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite@2x.png',
        imgPath: '../images/sprite@2x.png',
        cssName: 'sprite-2x.scss',
        padding: 20,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image.replace('.png', '').replace('.jpg', '').replace('.gif', '');
        },
      }
    }/*, {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/common/*@3x.{png,jpg,gif}'
      ],

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite@3x.png',
        imgPath: '../images/sprite@3x.png',
        cssName: 'sprite-3x.scss',
        padding: 30,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image.replace('.png', '').replace('.jpg', '').replace('.gif', '');
        },
      }
    }*/
  ],

};
