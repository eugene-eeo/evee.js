describe('evee.once', function() {
  var e = document.createElement('p');

  it('binds the handler to the element', function(done) {
    evee.once(e, 'click', function() {
      done();
    });
    evee.trigger(e, 'click');
  });

  it('only executes the handler once', function() {
    var o = [];
    evee.once(e, 'focus', function() {
      o.push(1);
    });
    evee.trigger(e, 'focus');
    assert(o.length === 1);
    evee.trigger(e, 'focus');
    assert(o.length === 1);
  });
});
