describe('evee.delegate()', function() {
  var e = document.createElement('p');
  [1,2,3].forEach(function() {
    e.appendChild(document.createElement('i'));
  });
  var c = Array.prototype.slice.call(e.childNodes);
  var d = new evee.delegate(e);

  describe('#on', function() {
    it('calls the handler with the correct target', function() {
      var data = {};
      d.on('click', 'i', function(ev) {
        assert(ev.target === data.el);
      });
      for (var i=c.length; i--;) {
        data.el = c[i];
        evee.fire(c[i], 'click');
      };
      d.off('click', 'i');
    });

    it('will not fire if the selector does not match', function() {
      var b = document.createElement('b');
      e.appendChild(b);
      d.on('click', '#crazy .class #id', function() {
        assert(false);
      });
      evee.fire(b, 'click');
    });
  });

  describe('#off', function() {
    it('unbinds the handler if specified', function() {
      var f = function() { assert(false); };
      d.on('focus', 'i', f);
      d.off('focus', 'i', f);
      evee.fire(c[0], 'focus');
    });

    it('unbinds all handlers of a type if specified', function() {
      var f = function() { assert(false); };
      var g = function() { assert(false); };
      d.on('focus', 'i', f);
      d.off('focus');
      evee.fire(c[0], 'focus');
    });

    it('unbinds all handlers if not', function() {
      var f1 = function() { assert(false); };
      var f2 = function() { assert(false); };
      d.on('focus', 'i', f1);
      d.on('focus', 'i', f2);
      d.off('focus', 'i');
      evee.fire(c[0], 'focus');
    });

    it('unbinds everything if no arguments', function() {
      var fn = function() { assert(false); };
      d.on('focus', 'i', fn);
      d.on('click', 'i', fn);
      d.off();
      evee.fire(c[0], 'focus');
      evee.fire(c[0], 'click');
    });
  });
});
