// ==UserScript==
// @name        InstaSynchP CSSLoader
// @namespace   InstaSynchP
// @description Plugin to load and unload CSS urls

// @version     1.0.5
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-CSSLoader
// @license     MIT

// @include     *://instasync.com/r/*
// @include     *://*.instasync.com/r/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js
// ==/UserScript==

function CSSLoader(version) {
  "use strict";
  this.version = version;
  this.name = 'InstaSynchP CSSLoader';
  this.styles = {};
}

CSSLoader.prototype.executeOnceCore = function () {
  "use strict";
  var th = this;
  window.cssLoader = (function () {

    return {
      'add': function (style) {
        //set the id as the name if it didn't get set
        if (!style.id) {
          style.id = style.name;
        }

        //save the style
        th.styles[style.name] = style;

        //load it
        if (style.autoload) {
          cssLoader.load(style.name);
        }
      },
      'load': function (styleName) {
        var style = th.styles[styleName],
          id = '#{0}'.format(style.id);
        $(id).remove();

        $('head').append(
          $('<link>', {
            'rel': 'stylesheet',
            'type': 'text/css',
            'id': style.id,
            'href': style.url
          }).on('load', function () {
            var ref = this;
            //fire event after the CSS has been loaded
            setTimeout(function () {
              events.fire('CSSLoad[{0}]'.format($(ref).attr('id')));
            }, 1000);
          })
        );
        //if the is nothing to load fire the event directly
        if (style.url === '') {
          events.fire('CSSLoad[{0}]'.format(style.id));
        }
      }
    };
  }());
};

window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader('1.0.5');
