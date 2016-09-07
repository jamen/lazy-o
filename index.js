var Token = function Token(x) { this.name = x; };
var slice = Array.prototype.slice;

lazy.Token = Token;
module.exports = lazy;

// Tokens
var $select = lazy.select = new Token('select');
var $add = lazy.add = new Token('add');

// Turn a value lazy.
function lazy(value) {
  // The object we stack operations in.
  var stack = [];

  // Run first queue and return.
  queue.apply(null, arguments);
  if (!queue.run) queue.run = run;
  return queue;

  // Return the queue function.
  function queue(key) {
    // Handling a function queue
    if (typeof key === 'function') {
      stack.unshift([key, null, arguments[1]]);
    }

    // Handling an array/string queue.
    if (typeof key === 'string' || key instanceof Token || key instanceof Array) {
      var ignore = false;
      var operation = key instanceof Array ? key : slice.call(arguments);
      var method = operation[0];

      // Handle method operators.
      switch (method[0]) {
        case '~': {
          method = method.slice(1);
          ignore = true;
        }
      }

      // Push results on stack.
      stack.unshift([method, slice.call(operation, 1), ignore]);
    }

    // Return self to chain.
    return queue;
  }

  function run(value) {
    for (var i = stack.length; i--;) {
      var operation = stack[i];
      var method = operation[0];
      var args = operation[1];
      var out = null;

      // Handle tokens.
      if (method === $select) value = value[args[0]];
      else if (method === $add) value += args[0];

      // Handle function supplied.
      else if (typeof method === 'function') {
        out = method(value);
      }

      // Handle using native methods.
      else {
        out = value[method].apply(value, args);
      }

      var ignore = operation[2];
      if (!ignore && out) value = out;
    }

    // Return resulting value.
    return value;
  }
};
