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

QUnit.test('Create link element', function (assert) {
  'use strict';
  var opts = {
    id: 'element_to_create',
    name: 'abc',
    url: 'foo'
  };
  var style = new Style(opts);

  style.createLinkElement();

  assert.strictEqual($('#' + style.id).length, 1,
    'Element has been created');

  assert.strictEqual($('#' + style.id).attr('href'), opts.url,
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
