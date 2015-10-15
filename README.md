# scrollEvents :scroll:
A pure JavaScript library to do stuff on scroll events. :zap:

`scrollEvents` gets you up and running in no time with scroll events.

![Demo](https://ryanpcmcquen.org/scrollEvents/scrollEventsDemo.gif)

=====

### API :secret:

The scrollEvents API has managed not to change since the `0.4.0` release, although we have expanded it with lots of goodies.

Let's looks at a simple example:

    scrollEvents.changeClass(".foo", "not-scrolled", "scrolled");

In this case we are changing the class after scrolling 10 pixels or more (measured by `window.pageYOffset`).

That is just the tip of the iceberg though! Check out https://ryanpcmcquen.org/scrollEvents/API.md to get all the fancy notes. :guitar:

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
