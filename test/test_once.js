describe('evee.once', function() {
  var e = $('p');

  it('binds the handler to the element', function(done) {
    evee.once(e, 'click', function() {
      done();
    });
    evee.fire(e, 'click');
  });

  it('only executes the handler once', function() {
    var o = 0;
    evee.once(e, 'focus', function() {
      o += 1;
    });
    for (var i=3; i--;) {
      evee.fire(e, 'focus');
      assert(o === 1);
    };
  });

  it('returns the handler', function() {
    var f = evee.once(e, 'focus', function() {
      assert(false);
    });
    evee.off(e, 'focus', f);
    evee.fire(e, 'focus');
  });
});
