var Token = function Token (x) { this.name = x }
var fargs = require('fast-args')

lazy.Token = Token
module.exports = lazy

// constants
var T_SELECT = lazy.select = new Token('select')
var T_ADD = lazy.add = new Token('add')

// Turn a value lazy.
function lazy (value) {
  // Stacking function calls in array.
  var stack = []

  // Run arguments as first queue.
  queue.apply(null, arguments)

  // Return queue function with methods.
  queue.run = run
  return queue

  /**
    * Queue new call on `stack`.
    */
  function queue (method) {
    var type = typeof method

    // Handling an method/token queue.
    if (type === 'string' || method instanceof Token) {
      var args = fargs(arguments, 1)
      stack.unshift([method, args])
    }

    // Handling a plain function queue.
    if (type === 'function') stack.unshift([method, null])

    // Return self
    return queue
  }

  /**
    * Run queued calls in `stack` on `value`.
    */
  function run (value) {
    if (arguments.length > 1) {
      var values = fargs(arguments)
      for (var a = values.length; a--;) values[a] = run(values[a])
      return values
    }

    for (var i = stack.length; i-- > 0;) {
      var operation = stack[i]
      var method = operation[0]
      var args = operation[1]

      // Handle using native methods.
      if (typeof method === 'string') value = value[method].apply(value, args)

      // Handle tokens.
      else if (method === T_SELECT) value = value[args[0]]
      else if (method === T_ADD) value += args[0]

      // Handle function supplied.
      else if (typeof method === 'function') value = method(value)
    }

    // Return resulting value.
    return value
  }
};
