# scrollEvents
A pure JavaScript library to easily handle scroll events.

scrollEvents gives you a quick set of functions to use to be up and running in no time with `onscroll` events.

Here is an example of something you could do:

    scrollEvents.change(".foo", 10, "height", "400px", "800px");

This will find all elements with the `foo` class, and change their height from `400px` to `800px` after reaching the breakpoint of `10` (scrolling 10 pixels down).

More options will be available in the future.
