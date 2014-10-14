// ==UserScript==
// @name        InstaSynchP CSSLoader
// @namespace   InstaSynchP
// @description Plugin to load and unload CSS urls

// @version     1
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-CSSLoader
// @license     GPL-3.0

// @include     http://*.instasynch.com/*
// @include     http://instasynch.com/*
// @include     http://*.instasync.com/*
// @include     http://instasync.com/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js
// ==/UserScript==

function CSSLoader(version) {
    "use strict";
    this.version = version;
}

CSSLoader.prototype.executeOnceCore = function() {
    "use strict";
    window.cssLoader = (function () {
        var styles = {};

        return {
            'add': function (style) {
                //set the id as the name if it didn't get set
                if (!style.id) {
                    style.id = style.name;
                }

                //save the style
                styles[style.name] = style;

                //load it
                if (style.autoload) {
                    cssLoader.load(style.name);
                }
            },
            'load': function (styleName) {
                var style = styles[styleName],
                    id = '#{0}'.format(style.id);
                $(id).remove();

                $('head').append(
                    $('<link>', {
                        'rel': 'stylesheet',
                        'type': 'text/css',
                        'id': style.id,
                        'href': style.url
                    }).on('load', function () {
                        //fire event after the CSS has been loaded
                        events.fire('onCSSLoad[{0}]'.format($(this).attr('id')));
                    })
                );
                //if the is nothing to load fire the event directly
                if (style.url === '') {
                    events.fire('onCSSLoad[{0}]'.format(style.id));
                }
            }
        };
    }());
};

window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader("1");
