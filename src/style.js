function Style(opts) {
  'use strict';
  this.name = opts.name;
  this.url = opts.url;
  this.autoload = opts.autoload;
  this.id = opts.id || this.name;
  this.content = opts.content;
  this.urlSetting = '{0}-css-url'.format(this.name);
  this.contentSetting = '{0}-css-content'.format(this.name);
  if (this.autoload) {
    this.load();
  }
}

Style.prototype.onLoad = function () {
  'use strict';
  var _this = this;
  _this.fillElement();
  events.fire('CSSLoad[{0}]'.format(_this.id));
};

Style.prototype.unLoad = function () {
  'use strict';
  var _this = this;
  $('#{0}'.format(_this.id)).remove();
};

Style.prototype.createElement = function () {
  'use strict';
  var _this = this;
  $('head').append(
    $('<style>', {
      'type': 'text/css',
      'id': _this.id
    })
  );
};

Style.prototype.getContentAsync = function () {
  'use strict';
  var _this = this;
  $.ajax({
    type: 'GET',
    url: _this.url,
    success: function (content) {
      _this.content = content;
      _this.save();
      _this.onLoad();
    }
  });
};

Style.prototype.save = function () {
  'use strict';
  var _this = this;
  gmc.set(_this.urlSetting, _this.url);
  gmc.set(_this.contentSetting, _this.content);
  window.plugins.settings.save();
};

Style.prototype.getContent = function () {
  'use strict';
  var _this = this;
  if (!_this.url) {
    return true;
  }
  if (_this.url === gmc.get(_this.urlSetting)) {
    _this.content = gmc.get(_this.contentSetting);
    return true;
  }
  _this.getContentAsync();
  return false;
};

Style.prototype.fillElement = function () {
  'use strict';
  var _this = this;
  $('#{0}'.format(_this.id)).text(_this.content);
};

Style.prototype.load = function () {
  'use strict';
  var _this = this;
  _this.unLoad();
  _this.createElement();
  if (_this.getContent()) {
    _this.onLoad();
  }
};
