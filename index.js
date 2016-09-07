var Token = function Token(x) { this.name = x; };
var slice = Array.prototype.slice;

lazy.Token = Token;
module.exports = lazy;

// constants
var T_SELECT = lazy.select = new Token('select');
var T_ADD = lazy.add = new Token('add');

// Turn a value lazy.
function lazy(value) {
  // Stacking function calls in array.
  var stack = [];

  // Run arguments as first queue.
  queue.apply(null, arguments);

  // Return queue function with methods.
  queue.run = run;
  return queue;

  /**
    * Queue new call on `stack`.
    */
  function queue(method, input, state) {
    var type = typeof method;

    // Handling an method/token queue.
    if (type === 'string' || method instanceof Token) {
      var args = Array.isArray(input) ? input : [input];
      stack.unshift([method, args, state]);
    }

    // Handling a plain function queue.
    else if (type === 'function') stack.unshift([method, null, input]);

    // Return self
    return queue;
  }

  /**
    * Run queued calls in `stack` on `value`.
    */
  function run(value) {
    for (var i = stack.length; i-- > 0;) {
      var operation = stack[i];
      var method = operation[0];
      var args = operation[1];
      var state = operation[2];
      var out;

      // Handle using native methods.
      if (typeof method === 'string') out = value[method].apply(value, args);

      // Handle tokens.
      else if (method === T_SELECT) value = value[args[0]];
      else if (method === T_ADD) value += args[0];

      // Handle function supplied.
      else if (typeof method === 'function') out = method(value);

      // Set the return to the value.
      if (out && state !== 'skip') value = out;
    }

    // Return resulting value.
    return value;
  }
};
