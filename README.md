# lazy-o [![NPM version](https://badge.fury.io/js/lazy-o.svg)](https://npmjs.org/package/lazy-o) [![Build Status](https://travis-ci.org/jamen/lazy-o.svg?branch=master)](https://travis-ci.org/jamen/lazy-o)

> Painless functional chains that are lazy.

```javascript
var lazy = require('lazy-o');

var foo = lazy([1, 2, 3, 4, 5, 6]) // Create a lazy value
  ('map', x => x + 3) // Queue an "o" operation
  ('slice', 3, 5) // Queue more operations.
  ('~forEach', console.log) // Ignore method output with `~`
  () // Execute with "o" parens.
```

Use this utility to create functional chains that are lazy, can accept arrays, and run other non-interfering operations.

## Installation

```sh
$ npm install --save lazy-o
```

## API

### `lazy(value)`
Turn a value lazy.
 - `value` (Anything): The value you want to queue operations on.

Returns the `queue` function, which you use to lazily queue operations on your value.

### `queue(method, ...args)`
### `queue([method, ...args])` (in array)
Queue an operation to eventually run on `value`.
 - `name` (`String`|`Token`): The operation you want to queue.

Returns `queue` function again so you can chain operations.

### `queue()`
Run all the queued operations on `value` in order.

Returns the resulting `value` after all the operations.

### Ignoring method output.
When you queue a method to run, it will replace `value` with whatever it returns.  If you just want to run a method on `value` without replacing it (i.e. with `forEach`) you can use the "ignore symbol", a.k.a. the tilde (`~`):

```js
var foo = lazy([1, 2, 3])
  ('map', x => x * 2)
  ('~forEach', console.log)
  ();
```

This will also still output your values, unaffected by the ignored methods.

## License

MIT © [Jamen Marz](https://github.com/jamen)
