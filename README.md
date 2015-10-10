# scrollEvents :scroll:
A pure JavaScript library to do stuff on scroll events. :zap:

`scrollEvents` gets you up and running in no time with scroll events.

![Demo](https://ryanpcmcquen.org/scrollEvents/scrollEventsDemo.gif)

=====

### API :secret:

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

Demo: https://jsfiddle.net/ryanpcmcquen/c2Lyqzvp/

=====

Added in `0.9.0`, we now allow method chaining:

    scrollEvents(".example").changeText("Back at the top!", "You have scrolled!").changeClass("example--not_scrolled", "example--scrolled");

So just feed your selector as an argument to `scrollEvents` without any methods, and then leave the `selector` argument out of all the methods. Thanks to @Tarabyte for all the help on this!

=====

### How do I use it? :shipit:

`scrollEvents` is available via RawGit CDN (version `0.9.0`).

Development:

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/611a6ac64d57e70fd4f80c8e8ea1577aef81713e/scrollEvents.js

Minified (~2kB!):

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/ddfe223fac3999a9ff809e377315fe86c442b671/scrollEvents.min.js


If you want to play with `scrollEvents` you can fork this fiddle:

https://jsfiddle.net/ryanpcmcquen/yc7oowrt/

Pull requests and issues are *always* welcome.

Enjoy!
