describe('evee', function() {
  var $ = document.getElementById.bind(document);
  var data = {r: 0};
  var elem = $('test');

  var handler = function(ev) {
    data.r += 1;
    assert(this === elem);
    assert(ev.data === data);
    assert(ev.target === elem);
  };

  describe('evee#trigger', function() {
    it('works for normal events', function() {
      evee.bind(elem, 'focus', handler, data);
      evee.trigger(elem, 'focus');
      assert(data.r === 1);
    });

    it('works for mouse events', function() {
      evee.bind(elem, 'click', handler, data);

      evee.trigger(elem, 'click');
      assert(data.r === 2);
    });

    it('triggers external handlers', function() {
      elem.addEventListener('click', function() {
        data.e = 1;
      });
      evee.trigger(elem, 'click');
      assert(data.e === 1);
    });
  });

  describe('evee#unbind', function() {
    it('unbinds handlers', function() {
      evee.unbind(elem, 'click', handler);
      evee.trigger(elem, 'click');
      assert(data.r === 3);
    });

    it('unbinds external handlers', function() {
      var f = function(ev) {
        ev.data.r += 1;
      };
      evee.bind(elem, 'click', f);
      evee.unbind(elem, 'click', f);
      evee.trigger(elem, 'click');
      assert(data.r === 3);
    });
  });
});
