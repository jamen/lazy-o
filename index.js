var Token = function Token(x) { this.name = x; };
var slice = Array.prototype.slice;

lazy.Token = Token;
module.exports = lazy;

// Tokens
var $select = lazy.select = new Token('select');
var $add = lazy.add = new Token('add');

// Turn a value lazy.
function lazy(value) {
  // Stacking function calls in array.
  var stack = [];

  // Run `lazy` arguments as first queue.
  queue.apply(null, arguments);

  // Return queue function with methods.
  queue.run = run;
  return queue;

  /**
    * Queue new call on `stack`.
    */
  function queue(method) {
    // Handling a function item.
    if (typeof method === 'function') stack.unshift([method, null, arguments[1]]);

    // Handling an array/string queue.
    else if (typeof method === 'string' || method instanceof Token) {
      var operation = slice.call(arguments);
      var ignore = false;

      // Handle return-skip tilde.
      if (method[0] === '~') {
        ignore = true;
        method = method.slice(1)
      }

      // Push results on `stack`.
      stack.unshift([method, slice.call(operation, 1), ignore]);
    }

    // Return self to chain.
    return queue;
  }

  /**
    * Run queued calls in `stack` on `value`.
    */
  function run(value) {
    for (var i = stack.length; i--;) {
      var operation = stack[i];
      var method = operation[0];
      var args = operation[1];
      var ignore = operation[2];
      var out = null;

      // Handle tokens.
      if (method === $select) value = value[args[0]];
      else if (method === $add) value += args[0];

      // Handle function supplied.
      else if (typeof method === 'function') out = method(value);

      // Handle using native methods.
      else out = value[method].apply(value, args);

      // Set the return to the value.
      if (out && !ignore) value = out;
    }

    // Return resulting value.
    return value;
  }
};
