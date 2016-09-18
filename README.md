# lazy-o [![NPM version](https://badge.fury.io/js/lazy-o.svg)](https://npmjs.org/package/lazy-o) [![Build Status](https://travis-ci.org/jamen/lazy-o.svg?branch=master)](https://travis-ci.org/jamen/lazy-o)

> Painless chains that are lazy, functional, and fast.

```js
var lazy = require('lazy-o')

var foo = lazy
  ('map', x => x + 3) // Queue a call
  ('slice', 3, 5) // Queue more calls
  (console.log) // Use plain function

// Apply calls on a value with '.run'
foo.run([1, 2, 3, 4, 5, 6])
// => [ 7, 8 ]
```

A small utility for creating execution chains that are functional.

**Note:** If you are creating JS APIs with this, you want to only expose `.run` to the user.  So they can call it like a normal function (`foo()` vs `foo.run()`), and also to prevent them putting extra calls on the lazy stack.

## Installation

```sh
$ npm install --save lazy-o
```

## API

### `lazy(method, [...args])`
Queue a method to run on the value.
 - `name` (`String`|`Token`): The operation you want to queue.
 - `args`: Arguments to supply to the method during execution.

Returns self, so you can chain more methods.

```js
var foo = lazy
  ('map', x => x + 1)
  ('slice', 1).run

foo([1, 2, 3])
// => [3, 4]
```

### `lazy(fn)`
Queue a plain function to run, the return replaces `value`.
 - `fn` (`Function`): A function that is run with the `value`

Returns self, so you can chain more methods.

```js
var foo = lazy(x => x + 1).run

foo(10)
// => 11
```

### `lazy.run(value)`
### `lazy.run(...values)`
Run all the queued calls on `value` or `values`.

Returns the resulting a modified value or array of values after all the calls have been applied.

Example with a single value:
```js
var foo = lazy('map', x => x + (x > 4 ? 1 : -1)).run

foo([1, 2, 3, 4, 5, 6, 7, 8])
// => [0, 1, 2, 3, 6, 7, 8, 9]
```

Multiple values:
```js
var bar = lazy('slice', 1, -1)('toUpperCase').run

bar.run('foobar', 'bazqux', 'hello world')
// => ['OOBA', 'AZQU', 'ELLO WORL']
```

## Meta
 - `npm test`: Run tests.
 - `npm run bench`: Run benchmarks.

## License

MIT © [Jamen Marz](https://github.com/jamen)
