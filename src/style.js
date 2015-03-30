function Style(opts) {
  'use strict';
  this.name = opts.name;
  this.url = opts.url;
  this.autoload = opts.autoload;
  this.id = opts.id || this.name;

  if (this.autoload) {
    this.load();
  }
}

Style.prototype.onLoad = function () {
  'use strict';
  var _this = this;
  events.fire('CSSLoad[{0}]'.format(_this.id));
};


Style.prototype.unLoad = function () {
  'use strict';
  var _this = this;
  $('#{0}'.format(_this.id)).remove();
};

Style.prototype.createLinkElement = function () {
  'use strict';
  var _this = this;
  $('head').append(
    $('<link>', {
      'rel': 'stylesheet',
      'type': 'text/css',
      'id': _this.id,
      'href': _this.url
    }).on('load', function () {
      setTimeout(function () {
        _this.onload();
      }, 1000);
    })
  );
};

Style.prototype.load = function () {
  'use strict';
  var _this = this;
  _this.unLoad();
  _this.createLinkElement();
  if (!_this.url) {
    _this.onLoad();
  }
};
