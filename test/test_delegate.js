describe('evee.delegate', function() {
  var el = $('div');
  el.innerHTML = (
    "<a></a>"
     + "<a><b id='id'></b></a>"
     + "<a><b class='klass'></b></a>"
  );
  var children = [];
  for (var i=3; i--;)
    children.unshift(el.children[i]);

  var b_id = children[1].firstChild;
  var b_kl = children[2].firstChild;

  // Workaround for safari - event handlers are not fired if
  // they are not bound to a "real" node.
  document.body.appendChild(el);

  it('binds the event handler to the parent element', function(done) {
    evee.delegate(el, 'click', '#id', function() {
      done();
    });
    evee.fire(b_id, 'click');
  });

  it('returns the event handler', function() {
    var h = evee.delegate(el, 'click', 'a', function() {
      assert(false);
    });
    evee.off(el, 'click', h);
    evee.fire(children[0], 'click');
  });

  it('calls the handler with the event and target', function() {
    evee.delegate(el, 'focus', 'a', function(ev, t) {
      assert(t === children[2]);
    });
    evee.fire(b_kl, 'focus');
  });

  it('only calls the handler once', function() {
    var counter = 0;
    evee.delegate(el, 'keydown', '*', function(ev, t) {
      counter++;
    });
    evee.fire(b_id, 'keydown');
    assert(counter === 1);
  });
 
  after(function() {
    document.body.removeChild(el);
  });
});
