// scrollEvents version 0.3.0
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
    change: function (selectors, breakPoint, property, initialValue, changedValue) {
      if (arguments.length < 5) {
        throw 'You have not supplied all parameters to scrollEvents.change, this may cause weird or unexpected behavior. The parameters are: selectors, breakPoint, property, initialValue, changedValue.';
      }
      //window.onscroll = function (event) {
      window.addEventListener("scroll", function (event) {
        // grab the selectors and convert them into an array so we can use forEach()
        var itemArray = [].slice.call(document.querySelectorAll(selectors));
        // window.pageYOffset has better compatibility than document.body.scrollTop
        var scrollPos = window.pageYOffset;
        if (scrollPos > breakPoint) {
          itemArray.forEach(function (i) {
            i.setAttribute("style", property + ": " + changedValue + ";");
          });
        } else {
          itemArray.forEach(function (i) {
            i.setAttribute("style", property + ": " + initialValue + ";");
          });
        }
      });
    }
  };
}