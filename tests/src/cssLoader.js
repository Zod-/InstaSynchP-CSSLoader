QUnit.module('CSSLoader');

QUnit.test('Add minimal', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.executeOnceCore();
  window.cssLoader.add(style);

  assert.strictEqual(cssLoader.styles[style.name].name,
    style.name, 'Name is the same');
  assert.strictEqual(cssLoader.styles[style.name].url,
    style.url, 'Url is the same');
});

QUnit.test('Add id autoset', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.executeOnceCore();
  window.cssLoader.add(style);

  assert.strictEqual(cssLoader.styles[style.name].id,
    style.name, 'Id is the same as the name');
});

QUnit.test('Add id set', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    id: 'cba',
    name: 'abc',
    url: 'http://foo.bar/baz.css'
  };

  cssLoader.executeOnceCore();
  window.cssLoader.add(style);

  assert.strictEqual(cssLoader.styles[style.name].id,
    style.id, 'Id wasn\'t changed');
});

QUnit.test('Add autoload', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var eventFired;
  var style = {
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
  window.cssLoader.add(style);

  assert.strictEqual(eventFired, 'CSSLoad[' + style.name + ']',
    'CSSLoad event fired');
});

QUnit.test('Add autoload id', function (assert) {
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
  window.cssLoader.add(style);

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
  window.cssLoader.add(style1);
  window.cssLoader.add(style2);

  window.cssLoader.load(style1.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');

  eventFired = undefined;
  window.cssLoader.load(style2.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');
});
