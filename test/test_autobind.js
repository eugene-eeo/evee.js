describe('evee.bind', function() {
  var elem = $('p');
  var data = {r: 0};

  it('binds the event handler', function(done) {
    evee.bind(elem, 'click', data, function(ev) {
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
});
