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

describe('scrollEvents', function() {
  it('should be ok', function() {
    scrollEvents.should.be.ok;
  });

  it('should expose default breakPoint', function() {
    scrollEvents.should.have.property('breakPoint', 10);
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