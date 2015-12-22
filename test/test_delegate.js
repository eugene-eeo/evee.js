describe('evee.delegate', function() {
  var e = $('p');
  [1,2,3].forEach(function() {
    e.appendChild(document.createElement('i'));
  });
  var c = Array.prototype.slice.call(e.childNodes);

  it('returns the delegated handler', function() {
    var h = evee.delegate(e, 'click', 'i', function(ev) {
      assert(false);
    });
    evee.off(e, 'click', h);
    evee.fire(e, 'click');
  });

  it('calls the handler with the correct target', function() {
    var data = {};
    var h = evee.delegate(e, 'click', 'i', function(ev) {
      assert(ev.target === data.el);
    });
    for (var i=c.length; i--;) {
      data.el = c[i];
      evee.fire(c[i], 'click');
    };
    evee.off(e, 'click', h);
  });

  it('will not fire if the selector does not match', function() {
    var b = $('b');
    e.appendChild(b);
    evee.delegate(e, 'click', '#crazy .class #id', function() {
      assert(false);
    });
    evee.fire(b, 'click');
  });
});
