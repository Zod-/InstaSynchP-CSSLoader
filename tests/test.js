QUnit.module('CSSLoader');

QUnit.test('AddStyle', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var opts = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };
  var style = new Style(opts);

  cssLoader.addStyle(opts);

  assert.deepEqual(cssLoader.styles[style.name], style,
    'Object has been added to the collection');
});

QUnit.test('Load', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var called = false;
  var opts1 = {
    name: 'abc1',
    url: ''
  };
  var opts2 = {
    name: 'abc2',
    url: ''
  };

  cssLoader.addStyle(opts1);
  cssLoader.addStyle(opts2);

  cssLoader.styles.abc1.load =
  cssLoader.styles.abc2.load = function(){
    called = this.name;
  };

  cssLoader.loadStyle(opts1.name);
  assert.strictEqual(called, opts1.name, 'Correct style loaded');

  cssLoader.loadStyle(opts2.name);
  assert.strictEqual(called, opts2.name, 'Correct style loaded');
});

//http://joquery.com/2012/string-format-for-javascript
if (typeof String.prototype.format !== 'function') {
  String.prototype.format = function () {
    'use strict';
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = this;
    var i;
    var regEx;

    // start with the second argument (i = 1)
    for (i = 0; i < arguments.length; i += 1) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multiline search
      regEx = new RegExp('\\{' + (i) + '\\}', 'gm');
      theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
  };
}

QUnit.test('Constructor id parse', function (assert) {
  'use strict';
  var opts = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };
  var style = new Style(opts);

  assert.strictEqual(style.id, style.name, 'Id is the same as the name');
});

QUnit.test('Constructor id overwrite', function (assert) {
  'use strict';
  var opts = {
    id: 'cba',
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };
  var style = new Style(opts);

  assert.strictEqual(style.id, style.id, 'Id wasn\'t changed');
});

QUnit.test('Fire load event', function (assert) {
  'use strict';
  var eventFired;
  var opts = {
    id: 'cba',
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };
  var style = new Style(opts);
  window.events = {
    fire: function (eventName) {
      eventFired = eventName;
    }
  };

  style.onLoad();

  assert.strictEqual(eventFired, 'CSSLoad[' + opts.id + ']',
    'CSSLoad event fired');
});

QUnit.test('Unload', function (assert) {
  'use strict';
  var opts = {
    id: 'id_to_remove'
  };
  var style = new Style(opts);

  style.unLoad();

  assert.strictEqual($('#' + style.id).length, 0,
    'Element has been unloaded');
});

QUnit.test('Fill', function (assert) {
  'use strict';
  var opts = {
    id: 'el_to_fill',
    content: 'foo'
  };
  var style = new Style(opts);

  style.fillElement();

  assert.strictEqual($('#' + style.id).text(), 'foo',
  'Element has been filled');
});

QUnit.test('Create element', function (assert) {
  'use strict';
  var opts = {
    id: 'element_to_create',
    name: 'abc',
    url: 'foo'
  };
  var style = new Style(opts);

  style.createElement();

  assert.strictEqual($('#' + style.id).length, 1,
    'Element has been created');
});

QUnit.test('Autoload', function (assert) {
  'use strict';
  var called = false;
  var opts = {
    id: 'bca',
    name: 'abc',
    url: ''
  };
  var StyleCopy = Style;
  StyleCopy.prototype.onLoad = function () {
    called = true;
  };
  new StyleCopy(opts);

  assert.strictEqual(called, false, 'onLoad not called');

  opts.autoload = true;
  new StyleCopy(opts);

  assert.strictEqual(called, true, 'onLoad called');
});
