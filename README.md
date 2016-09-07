# lazy-o [![NPM version](https://badge.fury.io/js/lazy-o.svg)](https://npmjs.org/package/lazy-o) [![Build Status](https://travis-ci.org/jamen/lazy-o.svg?branch=master)](https://travis-ci.org/jamen/lazy-o)

> Painless chains that are lazy, functional, and fast.

A small utility for creating functional chains that are lazy.  It also can handle methods that interrupt chains like `splice` or `forEach` using the [return-skip tilde](#api-tilde).

Example of lazy-o:
```js
var lazy = require('lazy-o');

var foo = lazy
  ('map', x => x + 3) // Queue a call
  ('slice', 3, 5) // Queue more calls
  (console.log) // Use plain functions.

// Run methods on a value with '.run'
foo.run([1, 2, 3, 4, 5, 6]);
// => [ 7, 8 ]
```

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
var foo = lazy(x => x + 1).run;

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
  ('slice', 1).run;

foo([1, 2, 3]);
// => [3, 4]
```

### `lazy.run(value)`
Run all the queued calls on `value` in order.

Returns the resulting `value` after all the calls.

```js
var foo = lazy('map', x => x + (x > 4 ? 1 : -1)).run;

foo([1, 2, 3, 4, 5, 6, 7, 8]);
// => [0, 1, 2, 3, 6, 7, 8, 9]
```

<a name='api-tilde'></a>
### Return-skip tilde.
When you queue a call, when ran it will replace `value` with whatever it returns.  If you just want to run a method on `value` without replacing it in the chain (i.e. with `forEach` or `splice`) you can use the "return-skip tilde" prefix (`~`):

```js
var foo = lazy
  ('map', x => x * 2)
  ('~forEach', console.log).run
  ('slice', 1);

foo([1, 2, 3]);
// => [2, 3]
// logs:
// => 2
// => 4
// => 6
```

This will pass your values on in the chain, unerrored by the return-skipped calls.

## Meta
 - `npm test`: Run tests.
 - `npm run bench`: Run benchmarks.

## License

MIT © [Jamen Marz](https://github.com/jamen)
