scrollEvents.changeStyle(".foo", "height", "25%", "75%");
scrollEvents.changeStyle(".foo", "backgroundColor", "#008cff", "#00ad85");
scrollEvents.changeText(".foo", "Scroll down to change stuff.", "Now we are taller and greener!");
scrollEvents.changeText("#corner__box", "At the top.", "You have scrolled!");
// the sexy new method chaining
scrollEvents('.bar').changeClass('nonscrolled', 'scrolled').changeHTML('Scroll down to change class.', 'We changed class. <br> <= That guy uses inline styles, EWWW.');
