describe('evee.on', function() {
  var el = $('p');

  it('returns the handler', function() {
    var fn = function() {};
    assert(evee.on(el, 'click', fn) === fn);
  });

  it('binds the handler to the element', function(done) {
    evee.on(el, 'click', function() {
      done();
    });
    evee.fire(el, 'click');
  });
});

describe('evee.off', function() {
  var el = $('p');

  it('removes the event handler', function() {
    var fn = evee.on(el, 'click', function() {
      assert(false);
    });
    evee.off(el, 'click', fn);
    evee.fire(el, 'click');
  });
});

describe('evee.fire', function() {
  var el = $('p');
  var ev = {
    mouse: 'click',
    keyboard: 'keyup',
    html: 'focus',
    custom: 'custom',
  };

  for (var i in ev) {
    var type = ev[i];
    it('triggers ' + i + ' events', (function(type) {
      return function(done) {
        evee.on(el, type, function() {
          done();
        });
        evee.fire(el, type);
      };
    })(type));
  }

  it('allows a config object', function(done) {
    evee.on(el, 'keydown', function(ev) {
      assert(ev.shiftKey);
      done();
    });
    evee.fire(el, 'keydown', {shiftKey: true});
  });
});
