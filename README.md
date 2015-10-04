# scrollEvents
A pure JavaScript library to do stuff on scroll events.

`scrollEvents` gets you up and running in no time with scroll events.

Here is an example of something you could do:

    scrollEvents.change(".foo", "height", "400px", "800px");

This will find all elements with the `foo` class, and change their height from `400px` to `800px` after reaching the default breakpoint of `10` (scrolling `10` pixels down). If `10` is not a satisfactory `breakPoint`, you can change it by adding a parameter like so:

    scrollEvents.change(".foo", "height", "400px", "800px", 50);

This will cause the change to occur once the user has scrolled down `50` pixels.

More options will be available in the future.

scrollEvents is available via CDN (version 0.3.0):

    //cdn.rawgit.com/ryanpcmcquen/scrollEvents/bcd2f6e074f9f2102236f42458c48c31870e7e2c/scrollEvents.js

Enjoy!
