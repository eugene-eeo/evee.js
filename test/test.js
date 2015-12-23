describe('evee', function() {
  var data = {r: 0};
  var elem = $('test');

  var handler = function(ev) {
    data.r += 1;
    assert(ev.target === elem);
  };

  describe('#fire', function() {
    it('works for normal events', function() {
      evee.on(elem, 'focus', handler);
      evee.fire(elem, 'focus');
      assert(data.r === 1);
    });

    it('works for mouse events', function() {
      evee.on(elem, 'click', handler);
      evee.fire(elem, 'click');
      assert(data.r === 2);
    });

    it('works for keyboard events', function() {
      evee.on(elem, 'keydown', function() {
        data.t = 1;
      });
      evee.fire(elem, 'keydown');
      assert(data.t === 1);
    });
  });

  describe('#off', function() {
    it('unbinds handlers', function() {
      var fn = function() {
        data.g = 1;
      }
      evee.on(elem, 'click', fn);
      evee.off(elem, 'click', fn);
      evee.fire(elem, 'click');
      assert(!data.g);
    });
  });
});
