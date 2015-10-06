chai.should();
mocha.ui('bdd');

function delay(fn) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      try {
        fn();
        resolve();
      }
      catch (e) {
        reject(e);
      }
    }, 100)
  });
}

describe('scrollEvents', function() {
  it('should be an object', function() {
    scrollEvents.should.be.an('object');
  });

  it('should expose default breakPoint', function() {
    scrollEvents.should.have.property('breakPoint', 10);
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
        window.scroll(0, 0);
        delay(function(){}).then(done, done);
      });

      it('should change style property on scroll', function(done) {      
        scrollEvents.changeStyle('#' + id, 'color', 'black', 'white');
        window.scrollBy(0, 100);
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
        window.scrollBy(0, 100);
        delay(function(){
          container.style.color.should.be.equal('blue');
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
        container.innerText = 'nonscrolled';
        id = 'change-text-test-container' + (i++);
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
        window.scroll(0, 0);
        delay(function(){}).then(done, done);
      });

      it('should change text on scroll', function(done) {      
        scrollEvents.changeText('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 100);
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
        window.scrollBy(0, 100);
        delay(function(){
          container.textContent.should.equal('nonscrolled');
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
        window.scroll(0, 0);
        delay(function(){}).then(done, done);
      });

      it('should change class on scroll', function(done) {      
        scrollEvents.changeClass('#' + id, 'nonscrolled', 'scrolled');
        window.scrollBy(0, 100);
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
        window.scrollBy(0, 100);
        delay(function(){
          container.classList.contains('scrolled').should.be.false;
          container.classList.contains('nonscrolled').should.be.true;
        }).then(done, done);
      });
    });
  });


 
});