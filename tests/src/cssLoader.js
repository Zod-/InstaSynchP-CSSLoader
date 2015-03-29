QUnit.module('CSSLoader');

QUnit.test('Save', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.save(style);

  assert.deepEqual(cssLoader.styles[style.name], style,
    'Object has been added to the collection');
});

QUnit.test('Parse', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.parse(style);

  assert.strictEqual(style.id, style.name, 'Id is the same as the name');
});

QUnit.test('Parse not overwrite id', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    id: 'cba',
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.parse(style);

  assert.strictEqual(style.id, style.id, 'Id wasn\'t changed');
});

QUnit.test('Autoload', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var eventFired;
  var style = {
    id: 'bca',
    name: 'abc',
    url: '',
    autoload: true
  };

  window.events = {
    fire: function (eventName) {
      eventFired = eventName;
    }
  };

  cssLoader.executeOnceCore();
  cssLoader.save(style);
  cssLoader.autoLoad(style);

  assert.strictEqual(eventFired, 'CSSLoad[' + style.id + ']',
    'CSSLoad event fired');
});

QUnit.test('Multiple style same id load', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var eventFired;
  var styleId = 'bca';
  var style1 = {
    id: styleId,
    name: 'abc1',
    url: ''
  };
  var style2 = {
    id: styleId,
    name: 'abc2',
    url: ''
  };

  window.events = {
    fire: function (eventName) {
      eventFired = eventName;
    }
  };

  cssLoader.executeOnceCore();
  cssLoader.addStyle(style1);
  cssLoader.addStyle(style2);

  window.cssLoader.load(style1.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');

  eventFired = undefined;
  window.cssLoader.load(style2.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');
});
