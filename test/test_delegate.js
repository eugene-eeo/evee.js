describe('evee.delegate()', function() {
  var e = document.createElement('p');
  [1,2,3].forEach(function() {
    e.appendChild(document.createElement('i'));
  });
  var c = Array.prototype.slice.call(e.childNodes);
  var d = new evee.delegate(e);

  describe('#bind', function() {
    it('calls the handler with the correct target', function() {
      var data = {};
      d.bind('click', 'i', function(ev) {
        assert(ev.target === data.el);
      });
      for (var i=c.length; i--;) {
        data.el = c[i];
        evee.trigger(c[i], 'click');
      };
      d.unbind('click', 'i');
    });

    it('will not fire if the selector does not match', function() {
      var b = document.createElement('b');
      e.appendChild(b);
      d.bind('click', 'i', function() {
        assert(false);
      });
      evee.trigger(b, 'click');
    });
  });

  describe('#unbind', function() {
    it('unbinds the handler if specified', function() {
      var f = function() { assert(false); };
      d.bind('focus', 'i', f);
      d.unbind('focus', 'i', f);
      evee.trigger(c[0], 'focus');
    });

    it('unbinds all handlers if not', function() {
      var f1 = function() { assert(false); };
      var f2 = function() { assert(false); };
      d.bind('focus', 'i', f1);
      d.bind('focus', 'i', f2);
      d.unbind('focus', 'i');
      evee.trigger(c[0], 'focus');
    });
  });

  describe('#off', function() {
    it('unbinds everything', function() {
      var fn = function() { assert(false); };
      d.bind('focus', 'i', fn);
      d.bind('click', 'i', fn);
      d.off();
      evee.trigger(c[0], 'focus');
      evee.trigger(c[0], 'click');
    });
  });
});
