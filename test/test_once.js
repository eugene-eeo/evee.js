describe('evee.once', function() {
  var e = document.createElement('p');

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
    evee.fire(e, 'focus');
    assert(o === 1);
    evee.fire(e, 'focus');
    assert(o === 1);
  });
});
