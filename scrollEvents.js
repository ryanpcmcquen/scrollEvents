// version 0.2.1
var scrollEvents = {
  change: function (selectors, breakPoint, property, initialValue, changedValue) {
    window.onscroll = function (event) {
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
    };
  }
};