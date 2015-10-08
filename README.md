# scrollEvents
A pure JavaScript library to do stuff on scroll events.

`scrollEvents` gets you up and running in no time with scroll events.

![Demo](https://ryanpcmcquen.org/scrollEvents/scrollEventsDemo.gif)

=====

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

Pull requests and issues are welcome!

`scrollEvents` is available via RawGit CDN (version `0.7.2`).

Development:

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/bf1866acdbe2408be6b90152a409cd1aa4c1d521/scrollEvents.js

Minified (under 2kB!):

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/aa14a255e3f5475e604da5588cdd656e8f5c5399/scrollEvents.min.js


If you want to play with `scrollEvents` you can fork this fiddle:

https://jsfiddle.net/ryanpcmcquen/yc7oowrt/

Enjoy!
