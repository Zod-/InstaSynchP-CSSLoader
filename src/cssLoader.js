function CSSLoader() {
  'use strict';
  this.version = '{{ VERSION }}';
  this.name = 'InstaSynchP CSSLoader';
  this.styles = {};
  this.Style = Style;
}

CSSLoader.prototype.log = function (opts) {
  'use strict';
  var args = [];
  opts.type = opts.type || 'debug';
  args.push(this.name);
  args.push(opts.event);
  if (opts.style) {
    args.push(opts.style.id);
    args.push(opts.style.name);
    args.push(opts.style.url);
  }
  logger()[opts.type].apply(logger(), args);
};

CSSLoader.prototype.addStyle = function (opts) {
  'use strict';
  var _this = this;
  _this.styles[opts.name] = new _this.Style(opts);
  _this.log({
    event: 'Add style',
    style: _this.styles[opts.name]
  });
};

CSSLoader.prototype.loadStyle = function (styleName) {
  'use strict';
  var _this = this;
  _this.styles[styleName].load();
  _this.log({
    event: 'Load style',
    style: _this.styles[styleName]
  });
};
window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader();
