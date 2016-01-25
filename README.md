# scrollEvents :scroll:

A pure JavaScript library to get you up and running in no time with scroll events. :zap:

![Demo](https://ryanpcmcquen.org/scrollEvents/scrollEventsDemo.gif)

=====

### API :secret:

The scrollEvents API has managed not to change since the `0.4.0` release, although we have expanded it with lots of goodies.

Let's looks at a simple example:

    scrollEvents.changeClass(".foo", "not-scrolled", "scrolled");

In this case we are changing the class after scrolling 10 pixels or more (measured by `window.pageYOffset`, `10` is the default `breakPoint`).

That is just the tip of the iceberg though! Check out the [API docs](https://github.com/ryanpcmcquen/scrollEvents/blob/gh-pages/API.md) to get all the fancy notes. :guitar:

=====

### How do I use it? :shipit:

`scrollEvents` is available via RawGit CDN (version `1.1.3`).

Development:

    <script src="https://cdn.rawgit.com/ryanpcmcquen/scrollEvents/8793e40a1b98516dec7b7d22a3c9bfb1026fea55/scrollEvents.js"></script>

https://cdn.rawgit.com/ryanpcmcquen/scrollEvents/8793e40a1b98516dec7b7d22a3c9bfb1026fea55/scrollEvents.js

Minified (under 3kB!):

    <script src="https://cdn.rawgit.com/ryanpcmcquen/scrollEvents/8793e40a1b98516dec7b7d22a3c9bfb1026fea55/scrollEvents.min.js"></script>

https://cdn.rawgit.com/ryanpcmcquen/scrollEvents/8793e40a1b98516dec7b7d22a3c9bfb1026fea55/scrollEvents.min.js

=====

If you want to play with `scrollEvents` you can fork this fiddle:

https://jsfiddle.net/ryanpcmcquen/yc7oowrt/

Pull requests and issues are *always* welcome.

Enjoy!
