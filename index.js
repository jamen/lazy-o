var Token = function Token() {};
var slice = Array.prototype.slice;

lazy.Token = Token;
module.exports = lazy;

// Tokens
var $select = lazy.select = new Token();
var $get = lazy.get = new Token();

// Turn a value lazy.
function lazy(value) {
  // The object we stack operations in.
  var stack = [];

  // Run first queue and return.
  queue.apply(null, arguments);
  if (!queue.use) queue.use = use;
  return queue;

  // Return the queue function.
  function queue(key) {
    // Handling a function queue
    if (typeof key === 'function') {
      stack.unshift([$get, [key], arguments[1]]);
    }

    // Handling an array/string queue.
    if (typeof key === 'string' || key instanceof Token || key instanceof Array) {
      var ignore = false;
      var operation = key instanceof Array ? key : slice.call(arguments);
      var method = operation[0];
      if (method[0] === '~') {
        method = method.slice(1);
        ignore = true;
      }

      stack.unshift([method, slice.call(operation, 1), ignore]);
    }

    // Return self to chain.
    return queue;
  }

  function use(value) {
    for (var i = stack.length; i--;) {
      var operation = stack[i];
      var method = operation[0];
      var args = operation[1];
      var ignore = operation[2];

      // Handle "select" token
      if (method === $select) value = value[args[0]];

      // Handle "run" token.
      else if (method === $get) {
        var out = args[0](value);
        if (!ignore && out || ignore === false) value = out;
      }

      // Handle using native methods.
      else {
        var out = value[method].apply(value, args);
        if (!ignore && out || ignore === false) value = out;
      }
    }

    // Return resulting value.
    return value;
  }
};
