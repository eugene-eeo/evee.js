describe('evee.delegate', function() {
  var el = $('div');
  var children = [
    $('a'),
    $('a'),
    $('a'),
  ];

  // Workaround for safari - event handlers are not fired if
  // they are not bound to a "real" node.
  document.body.appendChild(el);

  for (var i=children.length; i--;)
    el.appendChild(children[i]);

  it('binds the event handler to the parent element', function(done) {
    evee.delegate(el, 'click', 'a', function() {
      done();
    });
    evee.fire(children[0], 'click');
  });

  it('returns the event handler', function() {
    var h = evee.delegate(el, 'focus', 'a', function() {
      assert(false);
    });
    evee.fire(el, 'focus');
    evee.off(el, 'focus', h);
  });

  it('calls the handler with the correct target', function() {
    var data = {};
    var h = evee.delegate(el, 'focus', 'a', function(ev) {
      assert(ev.target === data.el);
    });
    for (var i=children.length; i--;) {
      var e = children[i];
      data.el = e;
      evee.fire(e, 'focus');
    }
    evee.off(el, 'focus', h);
  });

  it('supports selectors', function(done) {
    evee.delegate(el, 'focus', '.klass', function(ev) {
      done();
    });
    var b = $('b');
    b.classList.add('klass');
    el.appendChild(b);
    evee.fire(b, 'focus');
  });

  it('will not fire if the selector does not match', function() {
    evee.delegate(el, 'keyup', '#id', function() {
      assert(false);
    });
    evee.fire(children[0], 'keyup');
  });

  after(function() {
    document.body.removeChild(el);
  });
});
