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
  var _this = this;
  if (style.autoload) {
    _this.loadStyle(style.name);
  }
};

CSSLoader.prototype.addStyle = function (style) {
  'use strict';
  var _this = this;
  _this.parse(style);
  _this.save(style);
  _this.autoLoad(style);
};

CSSLoader.prototype.fireLoadEvent = function (id) {
  'use strict';
  events.fire('CSSLoad[{0}]'.format(id));
};

CSSLoader.prototype.fireEmptyEvent = function (style) {
  'use strict';
  var _this = this;
  if (!style.url) {
    _this.fireLoadEvent(style.id);
  }
};

CSSLoader.prototype.unload = function (style) {
  'use strict';
  $('#{0}'.format(style.id)).remove();
};

CSSLoader.prototype.createLinkElement = function (style) {
  'use strict';
  var _this = this;
  $('head').append(
    $('<link>', {
      'rel': 'stylesheet',
      'type': 'text/css',
      'id': style.id,
      'href': style.url
    }).on('load', function () {
      var __this = this;
      setTimeout(function () {
        _this.fireLoadEvent($(__this).attr('id'));
      }, 1000);
    })
  );
};

CSSLoader.prototype.loadStyle = function (styleName) {
  'use strict';
  var _this = this;
  var style = _this.styles[styleName];

  _this.unload(style);
  _this.createLinkElement(style);
  _this.fireEmptyEvent(style);
};

window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader();
