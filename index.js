var Token = function Token() {};
var slice = Array.prototype.slice;

module.exports = lazy;

// Tokens
var $select = lazy.select = new Token();

// Turn a value lazy.
function lazy(value) {
  // The object we lazily stash operations in.
  var lazyStash = [];

  // Return the queue function.
  return function queue(key) {
    // Run lazyStash
    if (!key) {
      for (var i = lazyStash.length; i--;) {
        var operation = lazyStash[i];
        var method = operation[0];
        var args = operation[1];
        var noReplace = operation[2];

        // Handle selection token.
        if (method === $select) value = value[operation[1][0]];

        // Handle using native methods.
        else {
          if (noReplace) value[method.slice(1)].apply(value, operation[1]);
          else value = value[method].apply(value, operation[1]);
        }
      }

      // Return resulting value.
      return value;
    }

    // Add to queue and continue lazyStash.
    var ignore = false;
    var operation = key instanceof Array ? key : slice.call(arguments);
    if (operation[0][0] === '~') {
      operation[0] = operation[0].slice(1);
      ignore = true;
    }
    lazyStash.unshift([operation[0], slice.call(operation, 1), ignore]);
    return queue;
  }
};

// Checking if a value is a token.
lazy.isToken = function isToken(value) {
  return value === $select;
};
