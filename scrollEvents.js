// @license magnet:?xt=urn:btih:3877d6d54b3accd4bc32f8a48bf32ebc0901502a&dn=mpl-2.0.txt MPL-v2
/*! scrollEvents v1.1.4 by ryanpcmcquen */
//
// Ryan P. C. McQuen | Everett, WA | ryanpcmcquen@member.fsf.org

/*global window*/
/*jslint browser: true, white:true*/

(function () {
  'use strict';

  // better to throw a new Error than just a string
  var throwErr = function (err) {
    throw new Error(err);
  };

  if (window.scrollEvents) {
    throwErr('You already have a global variable named scrollEvents.');
  }
  // taken from odis: https://github.com/ryanpcmcquen/odis
  var odis = {
    /* odis v0.1.2 by ryanpcmcquen */
    throttle: function (func, delay) {
      // nod to Douglas Adams  ;^)
      delay = delay || 42;
      var waiting = false,
        funcTimeoutId;
      return function () {
        if (!waiting) {
          // very similar to debounce, but 'waiting'
          // allows execution while being called
          waiting = true;
          clearTimeout(funcTimeoutId);
          funcTimeoutId = setTimeout(function () {
            func.call();
            waiting = false;
          }, delay);
        }
      };
    }
  };
  // select all elements matching selector
  var qsa = function (selector) {
    return document.querySelectorAll(selector);
  };

  // Function.prototype.call shortcut
  var call = qsa.call,
    // alias map since we use it so much
    each = call.bind(Array.prototype.map),
    // slice shortcut
    slice = call.bind(Array.prototype.slice),
    // array to hold all event listeners
    listeners = [],
    // run all listeners
    runner = odis.throttle(function () {
      each(listeners, function (listener) {
        listener();
      });
    });

  // add scroll listener
  var returnAddEventListener = function (fn) {
    if (!listeners.length) {
      // add single dom event listener that will run all registered listeners
      window.addEventListener('scroll', runner);
    }

    listeners.push(fn);

    return function removeEventListener() {
      // find current fn index
      var index = listeners.indexOf(fn);
      // if it is still there,
      // remove
      if (index > -1) {

        listeners.splice(index, 1);
      }

      // if no more listeners left,
      // unbind
      if (!listeners.length) {
        window.removeEventListener('scroll', runner);
      }
    };
  };

  // all scrollEvents public methods
  // both static and prototypes
  var methods = {
      /**
       * Changes element class.
       */
      changeClass: function (initial, changed) {
        if (arguments.length < 2) {
          throwErr('You have not supplied all parameters to scrollEvents.changeClass.');
        }

        return function (el, below) {
          var classes = el.classList;
          classes.toggle(initial, !below);
          classes.toggle(changed, below);
        };
      },

      /**
       * Changes element html content.
       */
      changeHTML: function (initial, changed) {
        if (arguments.length < 2) {
          throwErr('You have not supplied all parameters to scrollEvents.changeHTML.');
        }

        return function (el, below) {
          el.innerHTML = below ? changed : initial;
        };
      },

      /**
       * Changes element.style.property value.
       */
      changeStyle: function (property, initial, changed) {
        if (arguments.length < 3) {
          throwErr('You have not supplied all parameters to scrollEvents.changeStyle.');
        }

        return function (el, below) {
          el.style[property] = below ? changed : initial;
        };
      },

      /**
       * Changes element.textContent.
       */
      changeText: function (initial, changed) {
        if (arguments.length < 2) {
          throwErr('You have not supplied all parameters to scrollEvents.changeText.');
        }

        return function (el, below) {
          el.textContent = below ? changed : initial;
        };
      }
    },

    // all method names
    methodNames = Object.keys(methods),
    // when* methods (instance only)
    whenMethods = {};
  /**
   * Generic method
   */
  whenMethods.when = function (breakPoint) {
    var type;
    if (!breakPoint) {
      throwErr('breakPoint is required for scrollEvents.when*.');
    }
    type = typeof breakPoint;

    switch (type) {
    case 'function':
      return breakPoint;
    case 'string':
      return whenMethods.whenElement.apply(whenMethods, arguments);
    case 'number':
      return whenMethods.whenDistance.apply(whenMethods, arguments);
    default:
      throwErr('Unknown breakPoint type "' + type + '" for scrollEvents.when.');
    }
  };

  /**
   * When scroll distance reaches the breakpoint
   */
  whenMethods.whenDistance = function (breakPoint) {
    if (typeof breakPoint !== 'number') {
      throwErr('breakPoint should be a number for scrollEvents.whenDistance.');
    }
    return function () {
      return breakPoint;
    };
  };

  /**
   * When element selector enters the view port or hits top.
   */
  whenMethods.whenElement = function (selector, hitsTop) {
    if (typeof selector !== 'string') {
      throwErr('breakPoint should be a string for scrollEvents.whenElement.');
    }

    selector = document.querySelector(selector);

    // we want user be expicit whether she/he wants to trigger event when element hits top
    if (hitsTop === true) {
      return function () {
        return selector.offsetTop;
      };
    }
    // enters the viewport
    return function () {
      // all modern browsers support window.innerHeright
      return selector.offsetTop - window.innerHeight;
    };
  };

  /**
   * When element enters the viewport.
   */
  whenMethods.whenElementEnters = function (selector) {
    return whenMethods.whenElement(selector, false);
  };

  /**
   * When element hits the viewport top.
   */
  whenMethods.whenElementHitsTop = function (selector) {
    return whenMethods.whenElement(selector, true);
  };
  // all when* method names
  var whenMethodNames = Object.keys(whenMethods);

  // looks weird, but we need to declare this,
  // then define it, to avoid scoping issues
  var scrollSpy;
  scrollSpy = function (selector) {
    var spy = {},
      // all registered callbacks changers.
      callbacks = [],
      // default breakpoint getter
      defaultBreakPoint;

    // spy requires selector.
    if (!selector) {
      throwErr('Selector is required to apply scroll events to.');
    }

    // enhance spy object with public methods.
    methodNames.map(function (name) {
      // original method
      var method = methods[name];

      // make function that checks if we cross the breakPoint
      var makeBreakPointChecker = function (args) {
        var params = slice(args, method.length),
          breakPoint = params.length;

        breakPoint = breakPoint ? whenMethods.when.apply(whenMethods, params) : defaultBreakPoint;

        return function () {
          return window.pageYOffset > breakPoint();
        };
      };

      spy[name] = function () {
        // previous value
        var previous,
          args = arguments,
          // make isBelow checker
          isBelow = makeBreakPointChecker(args),
          // make el changer
          callback = method.apply(spy, args);

        // add to callback list
        callbacks.push(function (elements) {
          // get current value
          var current = isBelow();

          // check if it was actually changed
          if (current !== previous) {
            // save for the next call
            previous = current;

            // check if another callback has already made dom query
            if (!elements) {
              // query the DOM
              elements = qsa(selector);
            }
            // apply changer to each element
            each(elements, function (el) {
              callback(el, current);
            });
          }

          // return elements for the next callback to avoid multiple queries
          return elements;
        });

        return spy;
      };
    });

    // enhance spy object with when* methods
    whenMethodNames.map(function (name) {
      var method = whenMethods[name];

      method = method.apply.bind(method, methodNames);

      spy[name] = function () {
        defaultBreakPoint = method(arguments);
        return spy;
      };
    });

    // run all callbacks passing elements around
    function listener() {
      var elements;

      each(callbacks, function (cb) {
        elements = cb(elements);
      });
    }

    // does nothing but returns current spy
    function noop() {
      return spy;
    }

    // create on method that binds scroll listener for current spy
    spy.on = function on() {
      // add DOM listener
      var unbinder = returnAddEventListener(listener);

      // avoid multiple inits
      spy.on = noop;

      // make a turn off method
      spy.off = function off() {
        // unbind
        unbinder();

        // noop to avoid multiple unbinds.
        spy.off = noop;

        // restore on method
        spy.on = on;

        return spy;
      };

      return spy;
    };

    // init
    spy.on();
    // init default breakpoint getter
    spy.when(scrollSpy.breakPoint, !scrollSpy.useViewportHeight);

    return spy;
  };

  // default breakPoint
  scrollSpy.breakPoint = 10;

  // add the option to use the viewport height,
  // so that events can trigger when objects first
  // enter the viewport, rather than when they
  // hit the top of the page, ONLY activates
  // when breakPoint is a selector
  //
  // default is true until i am convinced that false
  // is more intuitive
  scrollSpy.useViewportHeight = true;

  // enhance scrollSpy with static methods
  methodNames.map(function (name) {
    scrollSpy[name] = function (selector /*, rest...*/ ) {
      var rest = slice(arguments, 1),
        // create a spy
        spy = scrollSpy(selector);

      // and invoke corresponding method on it
      return spy[name].apply(spy, rest);
    };
  });

  // export
  window.scrollEvents = scrollSpy;
}());
// @license-end
