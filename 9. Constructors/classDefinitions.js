/**
 * Constructor object 
 * As we’ve noted, the constructor function (an object) defines a name for a JavaScript class. Properties you add to this constructor object serve as class fields and class methods (depending on whether the property values are functions or not). 
 * 
 * Prototype object
 * The properties of this object are inherited by all instances of the class, and properties whose values are functions behave like instance methods of the class.
 * 
 * Instance object 
 * Each instance of a class is an object in its own right, and properties defined directly on an instance are not shared by any other instances. Nonfunction properties defined on instances behave as the instance fields of the class.
 */

// The steps of defining class in ES5 are so easy so they can be unified in three-step algorithm:
/**
 * 1. Define constructor function
 * 2. Define prototype properties on contructor
 * 3. Define fields on constructor that serve as static fields
 * 
 * It is so algorithmic that we can produce our ES5-style class definition function:
 */



function defineClass(constructor /*function*/ , methods /*object*/ , static /*object*/ ) {
  if (methods) {
    extend(constructor.prototype, methods);
  }
  if (static) {
    extend(constructor, static);
  }
  return constructor;
}





// Define an extend function that copies the properties of its second and 
// subsequent arguments onto its first argument.
// We work around an IE bug here: in many versions of IE, the for/in loop 
// won't enumerate an enumerable property of o if the prototype of o has 
// a nonenumerable property by the same name. This means that properties 
// like toString are not handled correctly unless we explicitly check for them.
var extend = (function () {
  for (var prop in {
      toString: null
    }) {
    // If we are there, then everything is OK
    return function extend(extensible /*object*/ ) {
      var i, prop, source;

      // Just walk through all the extensions and extend the given object
      for (i = 1; i < arguments.length; ++i) {
        source = arguments[i];
        for (prop in source) {
          extensible[prop] = source[prop];
        }
      }
      return extensible
    };
  }

  // If we get here, it means that the for/in loop did not enumerate 
  // the toString property of the test object. So return a version 
  // of the extend() function that explicitly tests for the nonenumerable 
  // properties of Object.prototype.
  return function patched_extend(extensible /*object*/ ) {
    var protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString'];

    // Here we do all the basic job
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        extensible[prop] = source[prop];
      }

      // And now look for the special cases
      for (var j = 0; i < protoprops.length; ++i) {
        var prop = protoprops[i];
        if (source.hasOwnProperty(prop)) {
          extensible[prop] = source[prop];
        }
      }
    }
    return extensible;
  }
})();


/** An example of defining whole Java-like class in JavaScript mechanics
 * Complex.js
 * 
 * Class defines complex as a pair of two real numbers (r, i), where r is real, i - imaginary 
 */
{
  function Complex(real, imaginary) {
    // Ensure adequate both arguments provided
    if (isNaN(real) || isNaN(imaginary)) {
      throw new TypeError("One of arguments is NaN: real: " + real + ", imaginary: " + imaginary);
    }

    this.r = real;
    this.i = imaginary;
  }

  Complex.prototype = {
    constructor: Complex,

    add: function (that) {
      return new Complex(this.r + that.r, this.i + that.i);
    },

    multiply: function (that) {
      return new Complex(this.r * this.r - that.i * that.i, this.r * that.i + this.i * that.r);
    },

    magnitude: function () {
      return Math.sqrt(this.r * this.r + this.i * this.i);
    },

    neg: function () {
      return new Complex(-this.r, -this.i);
    },

    toString: function () {
      return "(" + this.r + ", " + this.i + "i)";
    },

    equals: function (that) {
      return that != null //Must be defined in order our equals not invoking side errors
        &&
        that.constructor === Complex &&
        this.r === that.r &&
        this.i === that.i;
    }
  };

  Complex.ZERO = new Complex(0, 0);

  Complex.ONE = new Complex(1, 0);

  Complex.I = new Complex(0, 1);
}