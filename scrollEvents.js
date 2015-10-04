// version 0.1.1
var scrollEvents = {
  change: function (selector, breakPoint, property, initialValue, changedValue) {
    window.onscroll = function (event) {
      // grab the selectors and convert them into an array so we can use forEach()
      var items = document.getElementsByClassName(selector);
      var itemArray = [].slice.call(items);
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
    };
  }
};