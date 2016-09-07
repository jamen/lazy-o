var lazy = require('./');
var test = require('tape');

test('lazy operations', function(t) {
  t.is(lazy('slice', 0, 2).run('test'), 'te', 'lazy "test".slice(0, 2)');
  t.is(lazy('slice', 2)('toUpperCase').run('test'), 'ST', 'lazy "test".slice(2).toUpperCase()');
  t.same(lazy('~forEach', function(v) { t.is(v, 1, 'triggers ignore symbol method'); }).run([1]), [1], 'retains value in ignored methods');
  t.is(lazy(['slice', 1]).run('foo'), 'oo', 'Using array as operations');
  t.is(lazy(lazy.select, 0).run([1, 2, 3]), 1, 'Using tokens');
  t.is(lazy(x => {t.is(x, 3, 'passes value to plain function');return 5}).run(3), 5, 'passes on plain function return value.');
  t.is(lazy(x => 5, true).run(3), 3, 'allows ignoring plain functions.');
  t.end();
});
