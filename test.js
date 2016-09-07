var lazy = require('./');
var test = require('tape');

test('lazy operations', function(t) {
  t.is(lazy('slice', 0, 2).use('test'), 'te', 'lazy "test".slice(0, 2)');
  t.is(lazy('slice', 2)('toUpperCase').use('test'), 'ST', 'lazy "test".slice(2).toUpperCase()');
  t.same(lazy('~forEach', function(v) { t.is(v, 1, 'triggers ignore symbol method'); }).use([1]), [1], 'retains value in ignored methods');
  t.is(lazy(['slice', 1]).use('foo'), 'oo', 'Using array as operations');
  t.is(lazy(lazy.select, 0).use([1, 2, 3]), 1, 'Using tokens');
  t.is(lazy(x => {t.is(x, 3, 'passes value to plain function');return 5}).use(3), 5, 'passes on plain function return value.');
  t.is(lazy(x => 5, true).use(3), 3, 'allows ignoring plain functions.');
  t.end();
});
