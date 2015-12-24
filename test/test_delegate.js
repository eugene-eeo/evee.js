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

  it('calls the handler with the event and target', function() {
    var data = {};
    var h = evee.delegate(el, 'focus', 'a', function(ev, t) {
      assert(t === ev.target);
      assert(t === data.el);
    });
    for (var i=children.length; i--;) {
      var e = children[i];
      data.el = e;
      evee.fire(e, 'focus');
    }
    evee.off(el, 'focus', h);
  });

  it('will not fire if the selector does not match', function() {
    evee.delegate(el, 'keyup', '#id', function() {
      assert(false);
    });
    evee.fire(children[0], 'keyup');
  });

  it('will only call the handler once', function() {
    var c1 = children[0];
    var c2 = $('a');
    var counter = 0;

    c1.appendChild(c2);

    evee.delegate(el, 'keydown', '*', function() {
      counter++;
    });

    evee.fire(c2, 'keydown');
    assert(counter === 1);
  });

  after(function() {
    document.body.removeChild(el);
  });
});
