# lazy-o [![NPM version](https://badge.fury.io/js/lazy-o.svg)](https://npmjs.org/package/lazy-o) [![Build Status](https://travis-ci.org/jamen/lazy-o.svg?branch=master)](https://travis-ci.org/jamen/lazy-o)

> Painless functional chains that are lazy.

```js
var lazy = require('lazy-o');

var foo = lazy
  ('map', x => x + 3) // Queue a call
  ('slice', 3, 5) // Queue more calls
  (console.log) // Use plain functions.

// Run methods on a value with '.use'
foo.use([1, 2, 3, 4, 5, 6]);
// => [ 7, 8 ]
```

This utility is for creating functional chains that are lazy.  It can also accept arrays and use other interfering methods in chain calls (like `forEach`).

## Installation

```sh
$ npm install --save lazy-o
```

## API

### `lazy(fn, [ignore])`
Queue a plain function to run, the return replaces `value`.
 - `fn` (`Function`): A function that is run with the `value`
 - `ignore` (`Boolean`): Ignore the return value of this function.

Returns self, so you can chain more methods.

```js
var foo = lazy(x => x + 1).use;

foo(10);
// => 11
```

### `lazy(method, [...args])`
Queue a method to run on the value.
 - `name` (`String`|`Token`): The operation you want to queue.
 - `args`: Arguments to supply to the method during execution.

Returns self, so you can chain more methods.

```js
var foo = lazy
  ('map', x => x + 1)
  ('~forEach', console.log).use;

foo([1, 2, 3]);
// => 2
// => 3
// => 4
```

### `lazy.use(value)`
Run all the queued calls on `value` in order.

Returns the resulting `value` after all the calls.

```js
var foo = lazy('map', x => x + (x > 4 ? 1 : -1)).use;

foo([1, 2, 3, 4, 5, 6, 7, 8]);
// => [0, 1, 2, 3, 6, 7, 8, 9]
```

### Ignoring method output.
When you queue a method to run, it will replace `value` with whatever it returns.  If you just want to run a method on `value` without replacing it (i.e. with `forEach`) you can use the "ignore symbol", a.k.a. the tilde (`~`):

```js
var foo = lazy
  ('map', x => x * 2)
  ('~forEach', console.log).use;

foo([1, 2, 3]);
// => 2
// => 4
// => 6
```

This will still passed your values, unaffected by the ignored ones.

## License

MIT © [Jamen Marz](https://github.com/jamen)
