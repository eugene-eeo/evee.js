describe('evee.delegate', function() {
  var el, children, b_id, b_kl;

  beforeEach(function() {
    el = $('div');
    el.innerHTML = (
      "<a></a>"
       + "<a><b id='id'></b></a>"
       + "<a><b class='klass'></b></a>"
    );
    children = [];
    for (var i=3; i--;)
      children.unshift(el.children[i]);

    b_id = children[1].firstChild;
    b_kl = children[2].firstChild;

    // Workaround for safari - event handlers are not fired if
    // they are not bound to a "real" node.
    document.body.appendChild(el);
  });

  afterEach(function() {
    document.body.removeChild(el);
  });

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
    evee.delegate(el, 'click', 'a', function(ev, t) {
      assert(t === children[2]);
    });
    evee.fire(b_kl, 'click');
  });

  it('only calls the handler once', function() {
    var counter = 0;
    evee.delegate(el, 'click', '*', function(ev, t) {
      counter++;
    });
    evee.fire(b_id, 'click');
    assert(counter === 1);
  }); 
});
