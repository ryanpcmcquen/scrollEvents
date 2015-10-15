# API :secret:

Here is an example of something you could do:

    scrollEvents.changeStyle(".foo", "height", "400px", "800px");

This will find all elements with the `foo` class, and change their height from `400px` to `800px` after reaching the default breakpoint of `10` (scrolling `10` pixels down). If `10` is not a satisfactory `breakPoint`, you can change it by adding a parameter like so:

    scrollEvents.changeStyle(".foo", "height", "400px", "800px", 50);

This will cause the change to occur once the user has scrolled down `50` pixels.

Note that `changeStyle` uses `.style[property]` to change css, so camelCasing is necessary. For instance: `backgroundColor` will work, while `background-color` will not.

=====

You could also change the text of an element using `scrollEvents.changeText`, for example:

    scrollEvents.changeText("#corner__box", "At the top.", "You have scrolled!");

*PSST!* The `changeText` method also accepts `breakPoint` as an optional parameter, like so:

    scrollEvents.changeText("#corner__box", "At the top.", "You have scrolled!", 200);

This would cause the change to happen after scrolling down `200` pixels.

=====

I think you get the idea now. `changeClass` is also available, and looks like this:

    scrollEvents.changeClass('.bar', 'nonscrolled', 'scrolled');

=====

Added in `0.8.0`, we now have `changeHTML`:

    scrollEvents.changeHTML('.bar', 'Scroll down to change class.', 'We changed class. <br> <= That guy uses inline styles, EWWW.');

And the ability to use a selector as a `breakPoint` argument:

    scrollEvents.changeStyle(".foo", "height", "200px", "400px", ".bar");

Note that in `1.0.0`+ using a selector as the `breakPoint` argument triggers the event *when* the selector enters the viewport, rather than when it reaches the top. See below on `useViewportHeight` for more info.

Demo: https://jsfiddle.net/ryanpcmcquen/c2Lyqzvp/

=====

Added in `0.9.0`, we now allow method chaining:

    scrollEvents(".example").changeText("Back at the top!", "You have scrolled!").changeClass("example--not_scrolled", "example--scrolled");

So just feed your selector as an argument to `scrollEvents` without any methods, and then leave the `selector` argument out of all the methods. Thanks to @Tarabyte for all the help on this!

=====

Added in `1.0.0`, we now have a fancy new syntax. You don't have to use it ... but I heard that all the cool kids are. :sunglasses:

    scrollEvents('.foo').whenDistance(10).changeClass('unscrolled', 'scrolled10').whenElementEnters('.bar').changeText('unscrolled', '.bar enters the viewport').whenElementHitsTop('.bar').changeText('.bar enters the viewport', '.bar hits top');


We also added a new property: `useViewportHeight`. The default behavior is to have it enabled (`true`). What that means, is that when you use a selector as the `breakPoint` argument, the viewport height is added to the calculation. So if you have a box with the class `box` ... :neutral_face: ... the scrollEvent will trigger when `box` enters the viewport, not when it reaches the top of the page. This behavior may cause some slight breakage if you have been using `0.8.0` or `0.9.0` and you got used to that. To disable it, just have this at the top of your JS file:

    scrollEvents.useViewportHeight = false;
  
Note that this setting will be persistent across your file. If you want to flow in and out of using, and not using the viewport, you need to use the fancy new `when` methods. :love_letter:
