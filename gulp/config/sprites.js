'use strict';

var config = require('./');
var path = require('path');


/**
 * add more sprite configs to array if needed
 */
module.exports = {

  src: path.resolve(config.path.src, config.path.sprites) + '/**/*.png',
  watch: config.path.src + '/' + config.path.sprites + '/**/*.png',
  dest: path.resolve(config.path.build, config.path.images),

  sprites: [

    // sprite @1x:

    {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/global/*.png',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/global/*@2x.png',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/global/*@3x.png'
      ],

      cssDest: config.path.build + '/' + config.path.sass,

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite-global.png',
        imgPath: '../images/sprite-global.png',
        cssName: '_sprite-global.scss',
        padding: 10,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image
            .replace('.png', '')
            .replace('.jpg', '')
            .replace('.gif', '');
        }
      }
    },

    // sprite @2x:

    {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/global/*@2x.png',
        '!' + path.resolve(config.path.src, config.path.sprites) + '/global/*@3x.png'
      ],

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite-global@2x.png',
        imgPath: '../images/sprite-global@2x.png',
        cssName: '_sprite-global-2x.scss',
        padding: 20,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image
            .replace('.png', '')
            .replace('.jpg', '')
            .replace('.gif', '');
        }
      }
    }

    // sprite @3x:

    /*, {

      src: [
        path.resolve(config.path.src, config.path.sprites) + '/global/*@3x.png'
      ],

      spritesmith: {
        // engine:'canvas',
        imgName: 'sprite@3x.png',
        imgPath: '../images/sprite@3x.png',
        cssName: 'sprite-3x.scss',
        padding: 30,
        cssTemplate: './lib/spritesmith.' + config.preprocessor + '.tpl.mustache',
        cssVarMap: function(sprite) {
          sprite.image = sprite.image.replace('.png', '')
            .replace('.jpg', '')
            .replace('.gif', '');
        },
      }
    }*/
  ]

};
