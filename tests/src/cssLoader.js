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

QUnit.test('Multiple id load', function (assert) {
  'use strict';
  var cssLoader = new CSSLoader();
  var opts1 = {
    id: 'same_id',
    name: 'abc1',
    url: 'foo'
  };
  var opts2 = {
    id: 'same_id',
    name: 'abc2',
    url: 'bar'
  };

  cssLoader.addStyle(opts1);
  cssLoader.addStyle(opts2);

  cssLoader.loadStyle(opts1.name);
  assert.strictEqual($('#same_id').attr('href'), opts1.url,
  'Correct style loaded');

  cssLoader.loadStyle(opts2.name);
  assert.strictEqual($('#same_id').attr('href'), opts2.url,
  'Correct style loaded');
});
