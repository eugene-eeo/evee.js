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
  });

  describe('#unbind', function() {
    it('unbinds the handler if specified', function(done) {
      var f1 = function() { assert(false); };
      var f2 = function() { done(); };
      d.bind('click', 'i', f1);
      d.bind('click', 'i', f2);
      d.unbind('click', 'i', f1);
      evee.trigger(c[0], 'click');
    });

    it('unbinds all handlers if not', function() {
      var fn = function() { assert(false); };
      d.bind('focus', 'i', fn);
      d.bind('focus', 'i', fn);
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
