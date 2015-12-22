describe('evee.bind', function() {
  var elem = $('p');
  var data = {r: 0};

  it('binds the event handler', function(done) {
    evee.bind(elem, 'click', function(ev) {
      done();
    });
    evee.fire(elem, 'click');
  });

  it('sets Event.data', function() {
    evee.bind(elem, 'focus', data, function(ev) {
      assert(ev.data === data);
      assert(ev.target === elem);
    });
    evee.fire(elem, 'focus');
  });

  it('returns the bound handler', function() {
    var h = evee.bind(elem, 'keyup', data, function(ev) {
      assert(false);
    });
    evee.off(elem, 'keyup', h);
    evee.fire(elem, 'keyup');
  });
});
