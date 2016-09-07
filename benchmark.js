var lazy = require('./');
var Suite = require('benchmark').Benchmark.Suite;
var bench = new Suite('lazy-o');

var sample = [1, 2, 3, 4, 5];

bench.add('normal: slice, map, filter', function() {
  sample.slice(1, -1).map(x => x + 1).filter(x => x % 2);
});

var sliceMapFilter = lazy
  ('slice', [1, -1])
  ('map', x => x + 1)
  ('filter', x => x % 2).run;

bench.add('lazy-o: slice, map, filter', function() {
  sliceMapFilter(sample);
});

bench.add('lazy-o: creating lazy function', function() {
  lazy
    ('slice', [1, -1])
    ('map', x => x + 1)
    ('filter', x => x % 2).run(sample);
});

// Setup logger.
bench.on('cycle', function(event) {
  console.log(String(event.target));
});

bench.run();
