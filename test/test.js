describe('evee', function() {
  var data = {};
  var elem = $('test');

  var handler = function(ev) {
    data.r = 1;
    assert(ev.target === elem);
  };

  afterEach(function() {
    data = {};
  });

  describe('#fire', function() {
    it('works for normal events', function() {
      evee.on(elem, 'focus', handler);
      evee.fire(elem, 'focus');
      assert(data.r === 1);
    });

    it('works for mouse events', function() {
      evee.on(elem, 'click', handler);
      evee.fire(elem, 'click');
      assert(data.r === 1);
    });

    it('works for keyboard events', function() {
      evee.on(elem, 'keydown', handler);
      evee.fire(elem, 'keydown');
      assert(data.r === 1);
    });
  });

  describe('#off', function() {
    it('unbinds handlers', function() {
      evee.on(elem, 'click', handler);
      evee.off(elem, 'click', handler);
      evee.fire(elem, 'click');
      assert(!data.r);
    });
  });
});
