function CSSLoader() {
  'use strict';
  this.version = '{{ VERSION }}';
  this.name = 'InstaSynchP CSSLoader';
  this.styles = {};
  this.Style = Style;
}

CSSLoader.prototype.addStyle = function (opts) {
  'use strict';
  this.styles[opts.name] = new this.Style(opts);
};

CSSLoader.prototype.loadStyle = function (styleName) {
  'use strict';
  this.styles[styleName].load();
};

window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader();
