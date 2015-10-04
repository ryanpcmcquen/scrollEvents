// scrollEvents version 0.5.1
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
//
if (scrollEvents) {
  throw "You already have a global variable named scrollEvents, please rename scrollEvents.";
} else {
  var scrollEvents = {
    breakPoint: 10,
    changeStyle: function (selectors, property, initialValue, changedValue, breakPoint) {
      // throw an error if not enough parameters are supplied
      if (arguments.length < 4) {
        throw 'You have not supplied all parameters to scrollEvents.changeStyle, this may cause weird or unexpected behavior. The parameters are: selectors, property, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.';
      }
      // set breakPoint if parameter is not supplied
      var breakPoint = breakPoint || this.breakPoint;
      // using window.addEventListener allows multiple calls to scrollEvents,
      // as opposed to using window.onscroll
      window.addEventListener("scroll", function (event) {
        // grab the selectors and convert them into an array so we can use forEach()
        var itemArray = [].slice.call(document.querySelectorAll(selectors));
        // window.pageYOffset has better compatibility than document.body.scrollTop
        var scrollPos = window.pageYOffset;
        // check the scroll position and activate the changes,
        // otherwise return to the initialValue
        //
        // we use .style[property] instead of .setAttribute() so that
        // multiple changes can be easily done to an element
        if (scrollPos > breakPoint) {
          itemArray.forEach(function (i) {
            i.style[property] = changedValue;
          });
        } else {
          itemArray.forEach(function (i) {
            i.style[property] = initialValue;
          });
        }
      });
    },
    changeText: function (selectors, initialValue, changedValue, breakPoint) {
      // throw an error if not enough parameters are supplied
      if (arguments.length < 3) {
        throw 'You have not supplied all parameters to scrollEvents.changeText, this may cause weird or unexpected behavior. The parameters are: selectors, initialValue, changedValue, breakPoint. Note that breakPoint is optional and the default is 10.';
      }
      // set breakPoint if parameter is not supplied
      var breakPoint = breakPoint || this.breakPoint;
      // using window.addEventListener allows multiple calls to scrollEvents,
      // as opposed to using window.onscroll
      window.addEventListener("scroll", function (event) {
        // grab the selectors and convert them into an array so we can use forEach()
        var itemArray = [].slice.call(document.querySelectorAll(selectors));
        // window.pageYOffset has better compatibility than document.body.scrollTop
        var scrollPos = window.pageYOffset;
        // check the scroll position and activate the changes,
        // otherwise return to the initialValue
        if (scrollPos > breakPoint) {
          itemArray.forEach(function (i) {
            i.textContent = changedValue;
          });
        } else {
          itemArray.forEach(function (i) {
            i.textContent = initialValue;
          });
        }
      });
    }
  };
}