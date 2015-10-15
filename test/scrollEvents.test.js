chai.should();
mocha.ui('bdd');

function scrollTo(to) {
  window.scroll(0, to);
  return delay();
}

function delay(fn) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      try {
        if(typeof fn === 'function') {
          fn = fn();
        }
        resolve(fn);
      }
      catch (e) {
        reject(e);
      }
    }, 200)
  });
}

function div(id, clz, css) {
  var el = document.createElement('DIV');

  if(id) {
    el.setAttribute('id', id);
  }
  if(clz) {
    el.classList.add(clz);
  }

  if(css) {
    Object.keys(css).forEach(function(prop) {
      el.style[prop] = css[prop];
    });
  }

  document.body.appendChild(el);

  return el;
}

function checkClass(container) {
  return function(scrolled) {
    var classes = container.classList;
    classes.contains(scrolled ? 'scrolled' : 'unscrolled').should.be.true;
    classes.contains(scrolled ? 'unscrolled' : 'scrolled').should.be.false;    
  };
}

describe('scrollEvents', function() {
  it('should be ok', function() {
    scrollEvents.should.be.ok;
  });

  it('should expose default breakPoint', function() {
    scrollEvents.should.have.property('breakPoint', 10);
  });

  it('should expose default useViewportHeight', function() {
    scrollEvents.should.have.property('useViewportHeight', true);
  });

  describe('chaining', function() {
    it('should be a function', function() {
      scrollEvents.should.be.a('function');
    });

    it('should throw when called w/o selector', function() {
      (function() {
        scrollEvents()
      }).should.throw();
    });

    it('should create a spy', function() {
      scrollEvents('.foo').should.be.ok;
    });

    describe('scroll spy', function() {
      var spy = null,
        container = null;

      before(function() {
        spy = scrollEvents('#scroll-spy-test');
      });

      before(function() {
        container = document.createElement('DIV');
        container.style.height = '3000px';
        container.setAttribute('id', 'scroll-spy-test');
        container.classList.add('unscrolled');
        container.style.color = 'green';
        container.textContent = 'unscrolled';
        document.body.appendChild(container);
      });

      beforeEach(function(done) {
        scrollTo(0).then(done, done);
      });

      after(function() {
        container.parentNode.removeChild(container);
      });

      it('should allow to chain changeText', function(done) {
        spy.should.have.property('changeText')
          .that.is.a('function');

        var text = spy.changeText('unscrolled', 'scrolled');

        text.should.be.equal(spy);

        scrollTo(100).then(function() {
          container.textContent.should.be.equal('scrolled');
        }).then(done, done);
      });

      it('should allow to chain changeClass', function(done) {
        spy.should.have.property('changeClass')
          .that.is.a('function');

        var clz = spy.changeClass('unscrolled', 'scrolled');

        clz.should.be.equal(spy);

        scrollTo(100).then(function() {
          container.classList.contains('scrolled').should.be.true;
        }).then(done, done);
      });

      it('should allow to chain changeStyle', function(done) {
        spy.should.have.property('changeStyle')
          .that.is.a('function');

        var style = spy.changeStyle('color', 'green', 'red');

        style.should.be.equal(spy);

        scrollTo(100).then(function() {
          container.style.color.should.be.equal('red');
        }).then(done, done);
      });
    });
  });

  describe('when-api', function() {
    describe('#when', function() {
      it('should be a function', function() {
        scrollEvents('.foo').should.have.property('when')
          .that.is.a('function');
      });

      it('should throw when called w/o argument', function() {
        (function() {
          scrollEvents('.foo').when();
        }).should.throw();
      });

      it('should return a spy', function() {
        var spy = scrollEvents('.foo');

        spy.when(100).should.be.equal(spy);
      });

      it('should allow to pass custom function', function() {
        var spy = scrollEvents('.foo');

        spy.when(function() {
          return 100
        }).should.be.equal(spy);
      });

      describe('custom function', function() {
        var spy = null,
          container = null,
          check;

        before(function() {
          container = div('when-custom-function-test', 'unscrolled', {height: '3000px'});
          check = checkClass(container);
        });

        beforeEach(function(done) {
          scrollTo(0).then(done, done);
        });

        afterEach(function() {
          spy && spy.off();
          spy = null;
        });

        after(function() {
          container.remove();
        });

        it('should use function as a breakpoint', function(done) {
          spy = scrollEvents('#when-custom-function-test');

          spy.when(function sparta() {
            return 300;
          }).changeClass('unscrolled', 'scrolled');

          scrollTo(100)
          .then(function() {
            check(false);
            return scrollTo(350);
          })
          .then(function() {
            check(true);
          })
          .then(done)
          .catch(done);
        })

      });
    });

    describe('#whenDistance', function() {
      var spy = null,
        id = 'when-distance-test',
        byId = '#' + id,
        container = null,
        check;
        
      before(function() {
        container = div(id, 'unscrolled', {height: '3000px'});
        check = checkClass(container);
      });

      beforeEach(function(done) {
        scrollTo(0).then(done);
      });

      afterEach(function() {
        spy && spy.off();
        spy = null;
      });

      after(function() {
        container.remove();
      });

      it('should throw when called w/o argument', function() {
        (function() {
          scrollEvents(byId).whenDistance();
        }).should.throw();
      });

      it('should throw when the first argument is not a number', function() {
        (function() {
          scrollEvents(byId).whenDistance('.bar');
        }).should.throw();
      });

      it('should set the breakPoint', function(done) {
        spy = scrollEvents(byId);

        spy.whenDistance(100).should.be.equal(spy)

        spy.changeClass('unscrolled', 'scrolled');

        scrollTo(50)
        .then(function() {
          check(false)

          return scrollTo(150);
        })
        .then(function() {
          check(true)
        })
        .then(done)
        .catch(done);
      });
    });

    describe('#whenElement* methods', function() {
      var spy = null,
        id = 'when-element-test',
        byId = '#' + id,
        markerId = 'when-element-marker',
        marker = '#' + markerId,
        container = null,
        mark = null,
        check;
        
      before(function() {
        container = div(id, 'unscrolled', {height: '3000px'});    
        check = checkClass(container);

        mark = div(markerId, '', {
          position: 'absolute',
          height: '100px',
          top: '0px'
        });      
      });

      beforeEach(function(done) {
        scrollTo(0).then(done);
      });

      afterEach(function() {
        spy && spy.off();
        spy = null;
      });

      after(function() {
        container.remove();
        mark.remove();
      });

      it('should throw when called w/o argument', function() {
        (function() {
          scrollEvents(byId).whenElement();
        }).should.throw();
      });

      it('should throw when the first argument is not a string', function() {
        (function() {
          scrollEvents(byId).whenElement(100);
        }).should.throw();
      });

      it('should set the breakPoint to be selector\'s top + viewport height', function(done) {
        spy = scrollEvents(byId);

        spy.whenElement(marker).should.be.equal(spy)

        spy.changeClass('unscrolled', 'scrolled');

        var viewportHeight = window.innerHeight,
          height = viewportHeight + 200;

        mark.style.top = height + 'px';        

        scrollTo(100)
        .then(function() {
          check(false);

          return scrollTo(201);
        })
        .then(function() {
          check(true);
        })
        .then(done)
        .catch(done);
      });

      it('should set the breakPoint to be selector\'s top', function(done) {
        spy = scrollEvents(byId);

        spy.whenElement(marker, true).should.be.equal(spy)

        spy.changeClass('unscrolled', 'scrolled');

        mark.style.top = '200px';

        scrollTo(50)
        .then(function() {
          check(false);

          return scrollTo(250);
        })
        .then(function() {
          check(true);
        })
        .then(done)
        .catch(done);
      });

      it('should allow to call whenElementEnters directly', function(done) {
        spy = scrollEvents(byId);

        spy.whenElementEnters(marker).should.be.equal(spy)

        spy.changeClass('unscrolled', 'scrolled');

        var viewportHeight = document.documentElement.clientHeight,
          height = viewportHeight + 200;

        mark.style.top = height + 'px';

        scrollTo(100)
        .then(function() {
          check(false);
          return scrollTo(201);
        })
        .then(function() {
          check(true);
        })
        .then(done)
        .catch(done);
      });

      it('should allow to call whenElementHitsTop directly', function(done) {
        spy = scrollEvents(byId);

        spy.whenElementHitsTop(marker).should.be.equal(spy)

        spy.changeClass('unscrolled', 'scrolled');

        mark.style.top = '200px';

        scrollTo(50)
        .then(function() {
          check(false)

          return scrollTo(250);
        })
        .then(function() {
          check(true);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('#changeStyle', function() {
    it('should be a function', function() {
      scrollEvents.should.have.property('changeStyle')
        .that.is.a('function');
    });

    it('should throw when called w/ less than 4 arguments', function() {
      (function() {
        scrollEvents.changeStyle('a', 'b', 'c');
      }).should.throw();
    });

    describe('changing style propeties', function() {
      var container = null, i = 0, id;
      //create container
      beforeEach(function() {
        container = document.createElement('DIV');
        container.innerText = 'Tesing change style';
        id = 'change-style-test-container' + (i++);
        container.setAttribute('id', id);
        container.style.height = '3000px';

        document.body.appendChild(container);
      });

      //clear container
      afterEach(function() {
        container.parentNode.removeChild(container);
      });

      //scroll top
      beforeEach(function(done) {
        scrollTo(0).then(done, done);
      });

      it('should change style property on scroll', function(done) {      
        scrollEvents.changeStyle('#' + id, 'color', 'black', 'white');
        window.scrollBy(0, 200);
        delay(function(){
          container.style.color.should.be.equal('white');
        }).then(done, done);
      });

      it('should not change style property on small scrolls', function(done) {
        scrollEvents.changeStyle('#' + id, 'color', 'red', 'green');
        window.scrollBy(0, 7);
        delay(function(){
          container.style.color.should.be.equal('red');
        }).then(done, done);
      });

      it('should allow to pass custom breakPoint', function(done) {
        scrollEvents.changeStyle('#' + id, 'color', 'blue', 'purple', 1000);
        window.scrollBy(0, 200);
        delay(function(){
          container.style.color.should.be.equal('blue');
        }).then(done, done);
      });

      it('should return a spy', function(done) {
        var spy = scrollEvents.changeStyle('#' + id, 'color', 'white', 'yellow');
        container.style.color = 'black';
        spy.should.be.ok
          .and.have.property('off')
          .that.is.a('function');
        spy.off();
        window.scrollBy(0, 200);
        delay(function(){
          container.style.color.should.be.equal('black');
        }).then(done, done);
      });
    });    
  });

  describe('#changeText', function() {
    it('should be a function', function() {
      scrollEvents.should.have.property('changeText')
        .that.is.a('function');
    });

    it('should throw when called w/ less than 3 arguments', function() {
      (function() {
        scrollEvents.changeText('a', 'b');
      }).should.throw();
    });

    describe('changing text', function() {
      var container = null, i = 0, id;
      //create container
      beforeEach(function() {
        container = document.createElement('DIV');
        id = 'change-text-test-container' + (i++);
        container.setAttribute('id', id);
        container.style.height = '3000px';

        document.body.appendChild(container);    
        
        container.textContent = 'nonscrolled';
      });

      //clear container
      afterEach(function() {
        container.parentNode.removeChild(container);
      });

      //scroll top
      beforeEach(function(done) {
        scrollTo(0).then(done, done);
      });

      it('should change text on scroll', function(done) {      
        scrollEvents.changeText('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 200);
        delay(function(){
          container.textContent.should.equal('scrolled');
        }).then(done, done);
      });

      it('should not change text on small scrolls', function(done) {
        scrollEvents.changeText('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 7);
        delay(function(){
          container.textContent.should.equal('nonscrolled');
        }).then(done, done);
      });

      it('should allow to use custom breakPoint', function(done) {
        scrollEvents.changeText('#' + id, 'nonscrolled', 'scrolled', 1000);
        window.scrollBy(0, 200);
        delay(function(){
          container.textContent.should.equal('nonscrolled');
        }).then(done, done);
      });

      it('should return spy', function(done) {
        var spy = scrollEvents.changeText('#' + id, 'nonscrolled', 'scrolled');
        spy.should.have.property('off')
          .that.is.a('function');
        spy.off();
        window.scrollBy(0, 200);
        delay(function(){
          container.textContent.should.be.equal('nonscrolled');
        }).then(done, done);
      });

    });    
  });


  describe('#changeClass', function() {
    it('should be a function', function() {
      scrollEvents.should.have.property('changeClass')
        .that.is.a('function');
    });

    it('should throw when called w/ less than 3 arguments', function() {
      (function() {
        scrollEvents.changeClass('a', 'b');
      }).should.throw();
    });

    describe('changing classes', function() {
      var container = null, i = 0, id;
      //create container
      beforeEach(function() {
        container = document.createElement('DIV');
        container.classList.add('nonscrolled');
        id = 'change-class-test-container' + (i++);
        container.setAttribute('id', id);
        container.style.height = '3000px';

        document.body.appendChild(container);    
      });

      //clear container
      afterEach(function() {
        container.parentNode.removeChild(container);
      });

      //scroll top
      beforeEach(function(done) {
        scrollTo(0).then(done, done);
      });

      it('should change class on scroll', function(done) {      
        scrollEvents.changeClass('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 200);
        delay(function(){
          container.classList.contains('scrolled').should.be.true;
          container.classList.contains('nonscrolled').should.be.false;
        }).then(done, done);
      });

      it('should not change class on small scrolls', function(done) {
        scrollEvents.changeClass('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 7);
        delay(function(){
          container.classList.contains('scrolled').should.be.false;
          container.classList.contains('nonscrolled').should.be.true;
        }).then(done, done);
      });

      it('should allow to use custom breakPoint', function(done) {
        scrollEvents.changeClass('#' + id, 'nonscrolled', 'scrolled', 1000);
        window.scrollBy(0, 200);
        delay(function(){
          container.classList.contains('scrolled').should.be.false;
          container.classList.contains('nonscrolled').should.be.true;
        }).then(done, done);
      });

      it('should return a spy', function(done) {
        var spy = scrollEvents.changeClass('#' + id, 'nonscrolled', 'scrolled');
        spy.should.have.property('off')
          .that.is.a('function');

        spy.off();

        window.scrollBy(0, 200);
        delay(function(){
          container.classList.contains('scrolled').should.be.false;
          container.classList.contains('nonscrolled').should.be.true;
        }).then(done, done);
      });

    });
  }); 
});