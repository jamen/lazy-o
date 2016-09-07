var lazy = require('./');
var test = require('tape');

test('lazy operations', function(t) {
  t.is(lazy('test')('slice', 0, 2)(), 'te', 'lazy "test".slice(0, 2)');
  t.is(lazy('test')('slice', 2)('toUpperCase')(), 'ST', 'lazy "test".slice(2).toUpperCase()');
  t.same(lazy([1])('~forEach', function(v) { t.is(v, 1, 'triggers ignore symbol method'); })(), [1], 'retains value in ignored methods');
  t.is(lazy('foo')(['slice', 1])(), 'oo', 'Using array as operations');
  t.is(lazy([1, 2, 3])(lazy.select, 0)(), 1, 'Using tokens');
  t.end();
});
