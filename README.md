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

And added in `0.8.0`, we now have `changeHTML`:

    scrollEvents.changeHTML('.bar', 'Scroll down to change css class.', 'We use changeClass. <br> <= That guy uses inline styles, EWWW.');

=====

You can also use a selector as a `breakPoint` argument in `0.8.0`, see a demo here:

https://jsfiddle.net/ryanpcmcquen/c2Lyqzvp/

=====
Pull requests and issues are welcome!

`scrollEvents` is available via RawGit CDN (version `0.8.0`).

Development:

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/8db27068e7e4fc259856f51228193c7c282f8bef/scrollEvents.js

Minified (~2kB!):

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/8db27068e7e4fc259856f51228193c7c282f8bef/scrollEvents.min.js


If you want to play with `scrollEvents` you can fork this fiddle:

https://jsfiddle.net/ryanpcmcquen/yc7oowrt/

Enjoy!
