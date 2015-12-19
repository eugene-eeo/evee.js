describe('evee', function() {
  var $ = document.getElementById.bind(document);
  var data = {r: 0};
  var elem = $('test');

  var handler = function(ev) {
    data.r += 1;
    assert(ev.target === elem);
  };

  describe('#trigger', function() {
    it('works for normal events', function() {
      evee.bind(elem, 'focus', handler);
      evee.trigger(elem, 'focus');
      assert(data.r === 1);
    });

    it('works for mouse events', function() {
      evee.bind(elem, 'click', handler);
      evee.trigger(elem, 'click');
      assert(data.r === 2);
    });

    it('works for keyboard events', function() {
      evee.bind(elem, 'keydown', function() {
        data.t = 1;
      });
      evee.trigger(elem, 'keydown');
      assert(data.t === 1);
    });
  });

  describe('#unbind', function() {
    it('unbinds handlers', function() {
      var fn = function() {
        data.g = 1;
      }
      evee.bind(elem, 'click', fn);
      evee.unbind(elem, 'click', fn);
      evee.trigger(elem, 'click');
      assert(!data.g);
    });
  });
});
