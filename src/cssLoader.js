function CSSLoader() {
  'use strict';
  this.version = '{{ VERSION }}';
  this.name = 'InstaSynchP CSSLoader';
  this.styles = {};
}

CSSLoader.prototype.parse = function (style) {
  'use strict';
  if (!style.id) {
    style.id = style.name;
  }
};

CSSLoader.prototype.save = function (style) {
  'use strict';
  this.styles[style.name] = style;
};

CSSLoader.prototype.autoLoad = function (style) {
  'use strict';
  if (style.autoload) {
    window.cssLoader.load(style.name);
  }
};

CSSLoader.prototype.addStyle = function (style) {
  'use strict';
  var _this = this;
  _this.parse(style);
  _this.save(style);
  _this.autoLoad(style);
};

CSSLoader.prototype.executeOnceCore = function () {
  'use strict';
  var _this = this;
  window.cssLoader = (function () {

    return {
      'load': function (styleName) {
        var style = _this.styles[styleName];
        var id = '#{0}'.format(style.id);
        $(id).remove();

        $('head').append(
          $('<link>', {
            'rel': 'stylesheet',
            'type': 'text/css',
            'id': style.id,
            'href': style.url
          }).on('load', function () {
            var __this = this;
            //fire event after the CSS has been loaded
            setTimeout(function () {
              events.fire('CSSLoad[{0}]'.format($(__this).attr(
                'id')));
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
window.plugins.cssLoader = new CSSLoader();
