// version 0.2.0
var scrollEvents = {
  change: function (selectors, breakPoint, property, initialValue, changedValue) {
    window.onscroll = function (event) {
      // grab the selectors and convert them into an array so we can use forEach()
      var items = document.querySelectorAll(selectors);
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