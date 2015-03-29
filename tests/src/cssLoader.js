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


QUnit.test('Fire load event', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var eventFired;
  var id = 'abc';

  window.events = {
    fire: function (eventName) {
      eventFired = eventName;
    }
  };

  cssLoader.fireLoadEvent(id);

  assert.strictEqual(eventFired, 'CSSLoad[' + id + ']',
    'CSSLoad event fired');
});

QUnit.test('Autoload', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var styleName;
  var style = {
    id: 'bca',
    name: 'abc',
    url: ''
  };

  cssLoader.loadStyle = function (sn) {
    styleName = sn;
  };

  cssLoader.save(style);
  cssLoader.autoLoad(style);

  assert.strictEqual(styleName, undefined, 'loadStyle not called');

  style.autoload = true;
  cssLoader.autoLoad(style);

  assert.strictEqual(styleName, style.name, 'loadStyle called');
});

QUnit.test('Fire empty event', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var idLoaded;
  var style = {
    id: 'bca',
    url: 'foo'
  };

  cssLoader.fireLoadEvent = function (id) {
    idLoaded = id;
  };

  cssLoader.fireEmptyEvent(style);
  assert.strictEqual(idLoaded, undefined, 'fireLoadEvent not called');

  style.url = '';
  cssLoader.fireEmptyEvent(style);
  assert.strictEqual(idLoaded, style.id, 'fireLoadEvent called');
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

  cssLoader.addStyle(style1);
  cssLoader.addStyle(style2);

  cssLoader.loadStyle(style1.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');

  eventFired = undefined;
  cssLoader.loadStyle(style2.name);
  assert.strictEqual(eventFired, 'CSSLoad[' + styleId + ']',
    'CSSLoad event fired');
});

QUnit.test('Unload', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var style = {
    id: 'id_to_remove'
  };

  cssLoader.unload(style);

  assert.strictEqual($('#' + style.id).length, 0,
    'Element has been unloaded');
});
