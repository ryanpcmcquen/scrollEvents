// scrollEvents version 0.8.0
//
// Ryan P.C. McQuen | Everett, WA | ryan.q@linux.com
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version, with the following exception:
// the text of the GPL license may be omitted.
//
// This program is distributed in the hope that it will be useful, but
// without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose. Compiling,
// interpreting, executing or merely reading the text of the program
// may result in lapses of consciousness and/or very being, up to and
// including the end of all existence and the Universe as we know it.
// See the GNU General Public License for more details.
//
// You may have received a copy of the GNU General Public License along
// with this program (most likely, a file named COPYING).  If not, see
// <http://www.gnu.org/licenses/>.
(function (win, doc) {
  'use strict';
  if (win.scrollEvents) {
    // better to throw a new Error than just a string
    throw new Error('You already have a global variable named scrollEvents.');
  }
  // slightly modified/simplified version of underscore.js's throttle (v1.8.3)
  function throttle(func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function () {
      previous = new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = new Date().getTime();
      if (!previous) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }
  // select all elements matching selector
  function qsa(selector) {
    return doc.querySelectorAll(selector);
  }
  // alias forEach since we use it so much
  var each = qsa.call.bind([].forEach),
  // array to hold all event listeners
  listeners = [];
  // add another scroll event listener
  function addScrollListener(selectors, fn, initialValue, changedValue, breakPoint) {
    // no listeners so far
    if (!listeners.length) {
      // add single dom event listener that will run all registered listeners
      win.addEventListener('scroll',
          // 50ms is a pretty good throttle default,
          // still feels fast ... but won't completely spam out scroll events
          throttle(each.bind(null, listeners, function (listener) {
            listener();
          }), 50)
      );
    }

    // declared previous outside of listener(),
    // so it can survive a function call
    var previous;
    function listener() {
      var current = win.pageYOffset > breakPoint ? changedValue : initialValue;
      // make sure value was actually changed
      if (previous !== current) {
        // save value for the next call
        previous = current;
        // apply fn to each selected element with the current value
        each(qsa(selectors), function apply(el) {
          fn(el, current);
        });
      }
    }
    // register a listener
    listeners.push(listener);
    // remove scroll listener when called
    return function removeScrollListener() {
      var index = listeners.indexOf(listener);
      // if the listener is still there,
      // remove it
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
  // export to global
  win.scrollEvents = {
    breakPoint: 10,
    //
    // changeClass
    //
    changeClass: function (selectors, initialValue, changedValue, breakPoint) {
      if (arguments.length < 3) {
        throw new Error('You have not supplied all parameters to scrollEvents.changeClass, this may cause weird or unexpected behavior. The parameters are: selectors, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.');
      }
      return addScrollListener(selectors, function changeClass(el, value) {
        var classes = el.classList,
        initial = initialValue === value;
        classes.toggle(initialValue, initial);
        classes.toggle(changedValue, !initial);
      }, initialValue, changedValue, typeof breakPoint === 'string' ? document.querySelector(breakPoint).offsetTop : breakPoint || this.breakPoint);

    },
    //
    // changeHTML
    //
    changeHTML: function (selectors, initialValue, changedValue, breakPoint) {
      if (arguments.length < 3) {
        throw new Error('You have not supplied all parameters to scrollEvents.changeHTML, this may cause weird or unexpected behavior. The parameters are: selectors, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.');
      }
      return addScrollListener(selectors, function changeHTMLContent(el, value) {
        el.innerHTML = value;
      }, initialValue, changedValue, typeof breakPoint === 'string' ? document.querySelector(breakPoint).offsetTop : breakPoint || this.breakPoint);
    },
    //
    // changeStyle
    //
    changeStyle: function (selectors, property, initialValue, changedValue, breakPoint) {
      if (arguments.length < 4) {
        throw new Error('You have not supplied all parameters to scrollEvents.changeStyle, this may cause weird or unexpected behavior. The parameters are: selectors, property, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.');
      }
      return addScrollListener(selectors, function changeStyleProperty(el, value) {
        el.style[property] = value;
      }, initialValue, changedValue, typeof breakPoint === 'string' ? document.querySelector(breakPoint).offsetTop : breakPoint || this.breakPoint);
    },
    //
    // changeText
    //
    changeText: function (selectors, initialValue, changedValue, breakPoint) {
      if (arguments.length < 3) {
        throw new Error('You have not supplied all parameters to scrollEvents.changeText, this may cause weird or unexpected behavior. The parameters are: selectors, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.');
      }
      return addScrollListener(selectors, function changeTextContent(el, value) {
        el.textContent = value;
      }, initialValue, changedValue, typeof breakPoint === 'string' ? document.querySelector(breakPoint).offsetTop : breakPoint || this.breakPoint);
    }
  };
})(window, document);
